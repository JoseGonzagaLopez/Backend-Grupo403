import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudesPerfil } from './solicitudes-perfil.entity';
import { NegociosService } from '../negocios/negocios.service';

@Injectable()
export class SolicitudesPerfilService {
  constructor(
    @InjectRepository(SolicitudesPerfil)
    private readonly repo: Repository<SolicitudesPerfil>,
    private readonly negociosService: NegociosService,
  ) {}

  async create(businessId: number, cambios: Record<string, any>): Promise<SolicitudesPerfil> {
    const sol = this.repo.create({
      businessId,
      cambiosJson: JSON.stringify(cambios),
      estado: 'pending',
    });
    return this.repo.save(sol);
  }

  findAll(estado?: string): Promise<SolicitudesPerfil[]> {
    if (estado) return this.repo.find({ where: { estado: estado as any }, order: { createdAt: 'DESC' } });
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async aprobar(id: number): Promise<SolicitudesPerfil> {
    const sol = await this.repo.findOneBy({ id });
    if (!sol) throw new NotFoundException('Solicitud no encontrada');
    // Aplicar los cambios al negocio
    await this.negociosService.update(sol.businessId, sol.cambios);
    sol.estado = 'approved';
    return this.repo.save(sol);
  }

  async rechazar(id: number): Promise<SolicitudesPerfil> {
    const sol = await this.repo.findOneBy({ id });
    if (!sol) throw new NotFoundException('Solicitud no encontrada');
    sol.estado = 'rejected';
    return this.repo.save(sol);
  }
}
