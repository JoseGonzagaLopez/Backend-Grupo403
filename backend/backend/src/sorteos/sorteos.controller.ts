import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { SorteosService } from './sorteos.service';
import { CreateSorteoDto } from './dto/create-sorteo.dto';
import { Sorteo } from './sorteo.entity';
import { GanadorSorteo } from './ganadores.entity';

@Controller()
export class SorteosController {
  constructor(private readonly sorteosService: SorteosService) {}

  @Post('sorteos')
  create(@Body() createDto: CreateSorteoDto): Promise<Sorteo> {
    return this.sorteosService.create(createDto);
  }

  @Get('sorteos')
  findAll(@Query('businessId') businessId?: string): Promise<Sorteo[]> {
    return this.sorteosService.findAll(businessId ? +businessId : undefined);
  }

  @Get('sorteos/:id')
  findOne(@Param('id') id: string): Promise<Sorteo | null> {
    return this.sorteosService.findOne(+id);
  }

  @Post('sorteos/:id/forzar-finalizacion')
  async forzarFinalizacion(@Param('id') id: string) {
    await this.sorteosService.finalizarSorteoManual(+id);
    return { success: true };
  }

  // Endpoints para clientes
  @Get('ganadores/:customerId')
  getPremiosCliente(@Param('customerId') customerId: string): Promise<GanadorSorteo[]> {
    return this.sorteosService.getPremiosCliente(+customerId);
  }

  @Post('ganadores/:id/reclamar')
  reclamarPremio(@Param('id') id: string): Promise<GanadorSorteo | null> {
    return this.sorteosService.reclamarPremio(+id);
  }
}
