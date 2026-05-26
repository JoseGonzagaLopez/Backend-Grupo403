import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociosService } from './negocios.service';
import { NegociosController } from './negocios.controller';
import { Negocios } from './negocios.entity';
import { SolicitudesPerfil } from '../solicitudes-perfil/solicitudes-perfil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Negocios, SolicitudesPerfil])],
  controllers: [NegociosController],
  providers: [NegociosService],
  exports: [NegociosService],
})
export class NegociosModule {}
