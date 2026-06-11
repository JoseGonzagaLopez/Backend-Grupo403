import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, In, Between } from 'typeorm';
import { Sorteo } from './sorteo.entity';
import { GanadorSorteo } from './ganadores.entity';
import { CreateSorteoDto } from './dto/create-sorteo.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Appointment } from '../appointments/appointment.entity';
import { Pago } from '../pagos/pagos.entity';
import { Clientes } from '../clientes/clientes.entity';

@Injectable()
export class SorteosService {
  private readonly logger = new Logger(SorteosService.name);

  constructor(
    @InjectRepository(Sorteo)
    private sorteosRepository: Repository<Sorteo>,
    @InjectRepository(GanadorSorteo)
    private ganadoresRepository: Repository<GanadorSorteo>,
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Pago)
    private pagosRepository: Repository<Pago>,
    @InjectRepository(Clientes)
    private clientesRepository: Repository<Clientes>,
  ) {}

  async create(createDto: CreateSorteoDto): Promise<Sorteo> {
    const sorteo = this.sorteosRepository.create(createDto);
    return this.sorteosRepository.save(sorteo);
  }

  async findAll(businessId?: number): Promise<Sorteo[]> {
    if (businessId) {
      return this.sorteosRepository.find({ where: { businessId }, relations: ['servicioPremio'] });
    }
    return this.sorteosRepository.find({ relations: ['servicioPremio'] });
  }

  async findOne(id: number): Promise<Sorteo | null> {
    return this.sorteosRepository.findOne({ where: { id }, relations: ['servicioPremio'] });
  }

  async getPremiosCliente(customerId: number): Promise<GanadorSorteo[]> {
    return this.ganadoresRepository.find({
      where: { customerId },
      relations: ['sorteo', 'sorteo.servicioPremio', 'sorteo.negocio'],
    });
  }

  async reclamarPremio(id: number): Promise<GanadorSorteo | null> {
    const premio = await this.ganadoresRepository.findOne({ where: { id } });
    if (premio) {
      premio.premioReclamado = true;
      return this.ganadoresRepository.save(premio);
    }
    return null;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async procesarSorteosFinalizados() {
    this.logger.log('Iniciando procesamiento de sorteos finalizados...');
    const hoy = new Date().toISOString().split('T')[0];
    
    // Buscar sorteos activos cuya fecha de fin ya pas
    const sorteos = await this.sorteosRepository.find({
      where: {
        estado: 'activo',
        fechaFin: LessThan(hoy),
      },
    });

    for (const sorteo of sorteos) {
      this.logger.log(`Procesando sorteo ID: ${sorteo.id}`);
      await this.finalizarSorteo(sorteo);
    }
  }

  async finalizarSorteoManual(id: number) {
    const sorteo = await this.sorteosRepository.findOne({ where: { id } });
    if (sorteo && sorteo.estado === 'activo') {
      await this.finalizarSorteo(sorteo);
    }
  }

  private async finalizarSorteo(sorteo: Sorteo) {
    try {
      const elegibles = await this.obtenerClientesElegibles(sorteo);
      
      // Seleccionar ganadores al azar
      const ganadores = this.seleccionarAleatorios(elegibles, sorteo.cantidadGanadores);
      
      // Guardar ganadores
      for (const clienteId of ganadores) {
        const ganador = this.ganadoresRepository.create({
          sorteoId: sorteo.id,
          customerId: clienteId,
        });
        await this.ganadoresRepository.save(ganador);
      }

      // Actualizar estado del sorteo
      sorteo.estado = 'finalizado';
      await this.sorteosRepository.save(sorteo);
      this.logger.log(`Sorteo ${sorteo.id} finalizado con ${ganadores.length} ganadores.`);
    } catch (error) {
      this.logger.error(`Error procesando sorteo ${sorteo.id}: ${error.message}`);
    }
  }

  private async obtenerClientesElegibles(sorteo: Sorteo): Promise<number[]> {
    // 1. Obtener todos los clientes que han interactuado con el negocio antes de la fechaInicio
    // o que interactuaron durante el periodo. Por simplicidad, tomamos todos los que han hecho citas con el negocio.
    const appointmentsDelNegocio = await this.appointmentsRepository.find({
      where: { businessId: sorteo.businessId },
      select: ['customerId', 'date', 'serviceId']
    });

    const pagosDelNegocio = await this.pagosRepository.find({
      where: { businessId: sorteo.businessId },
      select: ['customerId', 'Importe', 'Fecha']
    });

    // Extraer IDs unicos de clientes
    const customerIds = new Set<number>();
    appointmentsDelNegocio.forEach(a => customerIds.add(a.customerId));
    pagosDelNegocio.forEach(p => customerIds.add(p.customerId));

    const elegibles: number[] = [];
    const serviciosValidos = sorteo.serviciosValidosId ? JSON.parse(sorteo.serviciosValidosId) : null;

    for (const customerId of customerIds) {
      // Calcular estadisticas previas
      const citasPrevias = appointmentsDelNegocio.filter(
        a => a.customerId === customerId && a.date < sorteo.fechaInicio
      ).length;

      const gastoPrevio = pagosDelNegocio.filter(
        p => p.customerId === customerId && p.Fecha < sorteo.fechaInicio
      ).reduce((sum, p) => sum + p.Importe, 0);

      // Calcular interacciones durante
      const citasDurante = appointmentsDelNegocio.filter(a => {
        const enFecha = a.customerId === customerId && a.date >= sorteo.fechaInicio && a.date <= sorteo.fechaFin;
        const servicioValido = serviciosValidos ? serviciosValidos.includes(a.serviceId) : true;
        return enFecha && servicioValido;
      }).length;

      // Evaluar condiciones
      if (
        citasPrevias >= sorteo.minReservasPrevias &&
        gastoPrevio >= sorteo.minGastoPrevio &&
        citasDurante >= sorteo.condicionReservasDurante
      ) {
        elegibles.push(customerId);
      }
    }

    return elegibles;
  }

  private seleccionarAleatorios(array: number[], cantidad: number): number[] {
    const shuffeled = array.slice().sort(() => 0.5 - Math.random());
    return shuffeled.slice(0, cantidad);
  }
}
