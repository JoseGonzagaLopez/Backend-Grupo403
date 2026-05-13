import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pagos.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagosRepository: Repository<Pago>,
  ) {}

  findAll() {
    return this.pagosRepository.find({
      relations: ['cliente', 'negocio'], // Carga los datos relacionados
      order: { Fecha: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.pagosRepository.findOne({
      where: { ID: id },
      relations: ['cliente', 'negocio'],
    });
  }

  create(createPagoDto: CreatePagoDto) {
    const pago = this.pagosRepository.create(createPagoDto);
    return this.pagosRepository.save(pago);
  }

  async update(id: number, updatePagoDto: UpdatePagoDto) {
    const pago = await this.pagosRepository.findOneBy({ ID: id });

    if (!pago) {
      throw new NotFoundException(`No existe el pago con id ${id}`);
    }

    const updatedPago = this.pagosRepository.merge(pago, updatePagoDto);
    return this.pagosRepository.save(updatedPago);
  }

  async remove(id: number) {
    const pago = await this.pagosRepository.findOneBy({ ID: id });

    if (!pago) {
      throw new NotFoundException(`No existe el pago con id ${id}`);
    }

    await this.pagosRepository.remove(pago);
    return { message: `Pago ${id} eliminado correctamente` };
  }
}