import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
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
    return this.negociosRepository.find({ order: { id: 'ASC' } });
  }

  findOne(id: number) {
    return this.negociosRepository.findOneBy({ id });
  }

  async register(dto: CreateNegociosDto): Promise<Negocios> {
    if (dto.Telefono) {
      const existing = await this.negociosRepository.findOneBy({ Telefono: dto.Telefono });
      if (existing) throw new ConflictException('Ya existe un negocio con ese teléfono.');
    }
    const negocio = this.negociosRepository.create(dto);
    return this.negociosRepository.save(negocio);
  }

  async login(Telefono: string, password: string): Promise<Negocios> {
    const negocio = await this.negociosRepository.findOneBy({ Telefono });
    if (!negocio) throw new UnauthorizedException('No existe un negocio con ese teléfono.');
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
