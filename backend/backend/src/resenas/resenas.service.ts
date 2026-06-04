import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './resena.entity';
import { CreateResenaDto } from './dto/create-resena.dto';

@Injectable()
export class ResenasService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepo: Repository<Resena>,
  ) {}

  findAll(businessId?: number): Promise<Resena[]> {
    if (businessId) {
      return this.resenaRepo.find({ where: { businessId } });
    }
    return this.resenaRepo.find();
  }

  findOne(id: number): Promise<Resena> {
    return this.resenaRepo.findOne({ where: { id } }).then((r) => {
      if (!r) throw new NotFoundException(`Resena #${id} no encontrada`);
      return r;
    });
  }

  async findByAppointment(appointmentId: number): Promise<Resena | null> {
    return this.resenaRepo.findOne({ where: { appointmentId } }) ?? null;
  }

  async create(dto: CreateResenaDto): Promise<Resena> {
    const resena = this.resenaRepo.create(dto);
    return this.resenaRepo.save(resena);
  }

  async remove(id: number): Promise<void> {
    await this.resenaRepo.delete(id);
  }
}
