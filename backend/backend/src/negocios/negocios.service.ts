import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Negocios } from './negocios.entity';
import { CreateNegociosDto } from './dto/create-negocios.dto';
import { UpdateNegociosDto } from './dto/update-negocios.dto';
import { SolicitudesPerfil } from '../solicitudes-perfil/solicitudes-perfil.entity';

@Injectable()
export class NegociosService {
  constructor(
    @InjectRepository(Negocios)
    private readonly negociosRepository: Repository<Negocios>,
    @InjectRepository(SolicitudesPerfil)
    private readonly solicitudesPerfilRepository: Repository<SolicitudesPerfil>,
  ) {}

  findAll() {
    return this.negociosRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number) {
    return this.negociosRepository.findOneBy({ id });
  }

  async register(dto: CreateNegociosDto): Promise<{ message: string }> {
    if (dto.Correo) {
      const existing = await this.negociosRepository.findOneBy({ Correo: dto.Correo });
      if (existing) throw new ConflictException('Ya existe un negocio con ese correo.');
    }

    const solicitud = this.solicitudesPerfilRepository.create({
      businessId: null,
      cambiosJson: JSON.stringify(dto),
      estado: 'pending',
    });
    await this.solicitudesPerfilRepository.save(solicitud);

    return { message: 'Solicitud de registro recibida y pendiente de aprobación.' };
  }

  async login(Correo: string, password: string): Promise<Negocios> {
    const negocio = await this.negociosRepository.findOneBy({ Correo });
    if (!negocio) throw new UnauthorizedException('No existe un negocio con ese correo.');
    if (negocio.password !== password) throw new UnauthorizedException('Contraseña incorrecta.');
    return negocio;
  }

  create(createNegociosDto: CreateNegociosDto) {
    const negocio = this.negociosRepository.create(createNegociosDto);
    return this.negociosRepository.save(negocio);
  }

  async update(id: number, updateNegociosDto: UpdateNegociosDto) {
    const negocio = await this.negociosRepository.findOneBy({ id });
    if (!negocio) throw new NotFoundException(`No existe el negocio con id ${id}`);
    const updatedNegocio = this.negociosRepository.merge(negocio, updateNegociosDto);
    return this.negociosRepository.save(updatedNegocio);
  }

  async remove(id: number) {
    const negocio = await this.negociosRepository.findOneBy({ id });
    if (!negocio) throw new NotFoundException(`No existe el negocio con id ${id}`);
    await this.negociosRepository.remove(negocio);
    return { message: `Negocio ${id} eliminado correctamente` };
  }
}
