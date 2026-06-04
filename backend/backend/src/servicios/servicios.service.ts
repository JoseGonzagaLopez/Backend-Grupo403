import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly serviciosRepository: Repository<Servicio>,
  ) {}

  findAll() {
    return this.serviciosRepository.find({ order: { id: 'ASC' } });
  }

  findByBusiness(businessId: number) {
    return this.serviciosRepository.find({ where: { businessId }, order: { id: 'ASC' } });
  }

  findOne(id: number) {
    return this.serviciosRepository.findOneBy({ id });
  }

  create(createServicioDto: CreateServicioDto) {
    const servicio = this.serviciosRepository.create(createServicioDto);
    return this.serviciosRepository.save(servicio);
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.serviciosRepository.findOneBy({ id });
    if (!servicio) throw new NotFoundException(`No existe el servicio con id ${id}`);
    const updated = this.serviciosRepository.merge(servicio, updateServicioDto);
    return this.serviciosRepository.save(updated);
  }

  async remove(id: number) {
    const servicio = await this.serviciosRepository.findOneBy({ id });
    if (!servicio) throw new NotFoundException(`No existe el servicio con id ${id}`);
    await this.serviciosRepository.remove(servicio);
    return { message: `Servicio ${id} eliminado correctamente` };
  }
}
