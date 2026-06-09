import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppointmentsModule } from './appointments/appointments.module';
import { PagosModule } from './pagos/pagos.module';
import { ClientesModule } from './clientes/clientes.module';
import { NegociosModule } from './negocios/negocios.module';
import { ServiciosModule } from './servicios/servicios.module';
import { SolicitudesPerfilModule } from './solicitudes-perfil/solicitudes-perfil.module';
import { ResenasModule } from './resenas/resenas.module';
import { SorteosModule } from './sorteos/sorteos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    AppointmentsModule,
    PagosModule,
    ClientesModule,
    NegociosModule,
    ServiciosModule,
    SolicitudesPerfilModule,
    ResenasModule,
    SorteosModule,
  ],
})
export class AppModule {}
