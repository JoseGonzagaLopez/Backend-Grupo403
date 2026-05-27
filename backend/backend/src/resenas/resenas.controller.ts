import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResenasService } from './resenas.service';
import { CreateResenaDto } from './dto/create-resena.dto';

@ApiTags('resenas')
@Controller('resenas')
export class ResenasController {
  constructor(private readonly service: ResenasService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Reseña creada' })
  create(@Body() dto: CreateResenaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ description: 'Listado de reseñas' })
  findAll(@Query('businessId') businessId?: string) {
    return this.service.findAll(businessId ? Number(businessId) : undefined);
  }

  @Get('appointment/:appointmentId')
  @ApiOkResponse({ description: 'Reseña de una reserva concreta' })
  findByAppointment(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    return this.service.findByAppointment(appointmentId);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Reseña eliminada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
