import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NegociosService } from './negocios.service';
import { NegociosController } from './negocios.controller';
import { Negocios } from './negocios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Negocios])],
  controllers: [NegociosController],
  providers: [NegociosService],
})
export class NegociosModule {}