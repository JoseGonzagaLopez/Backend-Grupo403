import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Negocios } from './negocios.entity';
import { CreateNegociosDto } from './dto/create-negocios.dto';
import { UpdateNegociosDto } from './dto/update-negocios.dto';

import * as bcrypt from 'bcryptjs';

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

  async register(createNegociosDto: CreateNegociosDto) {
    if (createNegociosDto.password) {
      const salt = await bcrypt.genSalt(10);
      createNegociosDto.password = await bcrypt.hash(createNegociosDto.password, salt);
    }

    const existing = await this.negociosRepository.findOneBy({ Telefono: createNegociosDto.Telefono });
    if (existing) {
      if (!existing.password && createNegociosDto.password) {
        existing.password = createNegociosDto.password;
        return this.negociosRepository.save(existing);
      }
      throw new Error('Ya existe un negocio registrado con ese teléfono');
    }

    const negocio = this.negociosRepository.create(createNegociosDto);
    return this.negociosRepository.save(negocio);
  }

  async login(telefono: string, pass: string) {
    const negocio = await this.negociosRepository
      .createQueryBuilder('negocio')
      .addSelect('negocio.password')
      .where('negocio.Telefono = :telefono', { telefono })
      .getOne();

    if (!negocio) {
      throw new NotFoundException('Negocio no encontrado');
    }
    if (!negocio.password) {
      throw new UnauthorizedException('El negocio no tiene contraseña configurada');
    }
    const isMatch = await bcrypt.compare(pass, negocio.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const { password, ...result } = negocio;
    return result;
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
