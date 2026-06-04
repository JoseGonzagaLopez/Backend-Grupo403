import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Negocios } from './negocios.entity';
import { CreateNegociosDto } from './dto/create-negocios.dto';
import { UpdateNegociosDto } from './dto/update-negocios.dto';
import { SolicitudesPerfil } from '../solicitudes-perfil/solicitudes-perfil.entity';
import * as bcrypt from 'bcryptjs';

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

    return { message: 'Solicitud de registro recibida y pendiente de aprobaci\u00f3n.' };
  }

  async login(Correo: string, password: string): Promise<Negocios> {
    const negocio = await this.negociosRepository.findOneBy({ Correo });
    if (!negocio) throw new UnauthorizedException('No existe un negocio con ese correo.');
    if (!negocio.password) throw new UnauthorizedException('Este negocio no tiene contrase\u00f1a configurada.');
    const isMatch = await bcrypt.compare(password, negocio.password);
    if (!isMatch) throw new UnauthorizedException('Contrase\u00f1a incorrecta.');
    return negocio;
  }

  async create(createNegociosDto: CreateNegociosDto) {
    if (createNegociosDto.password) {
      const salt = await bcrypt.genSalt(10);
      createNegociosDto.password = await bcrypt.hash(createNegociosDto.password, salt);
    }
    const negocio = this.negociosRepository.create(createNegociosDto);
    return this.negociosRepository.save(negocio);
  }

  async update(id: number, updateNegociosDto: UpdateNegociosDto) {
    const negocio = await this.negociosRepository.findOneBy({ id });
    if (!negocio) throw new NotFoundException(`No existe el negocio con id ${id}`);
    if (updateNegociosDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateNegociosDto.password = await bcrypt.hash(updateNegociosDto.password, salt);
    }
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
