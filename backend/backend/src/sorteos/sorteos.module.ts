import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SorteosController } from './sorteos.controller';
import { SorteosService } from './sorteos.service';
import { Sorteo } from './sorteo.entity';
import { GanadorSorteo } from './ganadores.entity';
import { Appointment } from '../appointments/appointment.entity';
import { Pago } from '../pagos/pagos.entity';
import { Clientes } from '../clientes/clientes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sorteo, GanadorSorteo, Appointment, Pago, Clientes])
  ],
  controllers: [SorteosController],
  providers: [SorteosService],
})
export class SorteosModule {}
