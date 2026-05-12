import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { PagosModule } from './pagos/pagos.module'; 
import {ClientesModule} from './clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AppointmentsModule,
    PagosModule, 
    ClientesModule,
  ],
})
export class AppModule {}