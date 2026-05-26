import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesPerfil } from './solicitudes-perfil.entity';
import { SolicitudesPerfilService } from './solicitudes-perfil.service';
import { SolicitudesPerfilController } from './solicitudes-perfil.controller';
import { NegociosModule } from '../negocios/negocios.module';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudesPerfil]), NegociosModule],
  controllers: [SolicitudesPerfilController],
  providers: [SolicitudesPerfilService],
  exports: [SolicitudesPerfilService],
})
export class SolicitudesPerfilModule {}
