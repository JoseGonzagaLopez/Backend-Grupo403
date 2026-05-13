import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Negocios } from './negocios.entity';
import { CreateNegociosDto } from './dto/create-negocios.dto';
import { UpdateNegociosDto } from './dto/update-negocios.dto';

@Injectable()
export class NegociosService {
  constructor(
    @InjectRepository(Negocios)
    private readonly negociosRepository: Repository<Negocios>,
  ) {}

  findAll() {
    return this.negociosRepository.find({
      order: { id: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.negociosRepository.findOneBy({ id });
  }

  create(createNegociosDto: CreateNegociosDto) {
    const negocio = this.negociosRepository.create(createNegociosDto);
    return this.negociosRepository.save(negocio);
  }

  async update(id: number, updateNegociosDto: UpdateNegociosDto) {
    const negocio = await this.negociosRepository.findOneBy({ id });

    if (!negocio) {
      throw new NotFoundException(`No existe el negocio con id ${id}`);
    }

    const updatedNegocio = this.negociosRepository.merge(negocio, updateNegociosDto);
    return this.negociosRepository.save(updatedNegocio);
  }

  async remove(id: number) {
    const negocio = await this.negociosRepository.findOneBy({ id });

    if (!negocio) {
      throw new NotFoundException(`No existe el negocio con id ${id}`);
    }

    await this.negociosRepository.remove(negocio);
    return { message: `Negocio ${id} eliminado correctamente` };
  }
}