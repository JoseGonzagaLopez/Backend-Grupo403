import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resena } from './resena.entity';
import { CreateResenaDto } from './dto/create-resena.dto';

@Injectable()
export class ResenasService {
  constructor(
    @InjectRepository(Resena)
    private readonly repo: Repository<Resena>,
  ) {}

  create(dto: CreateResenaDto): Promise<Resena> {
    const resena = this.repo.create(dto);
    return this.repo.save(resena);
  }

  findAll(businessId?: number): Promise<Resena[]> {
    if (businessId) {
      return this.repo.find({
        where: { businessId },
        order: { fecha: 'DESC' },
      });
    }
    return this.repo.find({ order: { fecha: 'DESC' } });
  }

  findByAppointment(appointmentId: number): Promise<Resena | null> {
    return this.repo.findOne({ where: { appointmentId } });
  }

  async remove(id: number): Promise<{ message: string }> {
    const resena = await this.repo.findOneBy({ id });
    if (!resena) throw new NotFoundException('Reseña no encontrada');
    await this.repo.remove(resena);
    return { message: 'Reseña eliminada' };
  }
}
