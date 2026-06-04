import {
  Controller, Get, Post, Delete,
  Param, Body, Query, ParseIntPipe,
} from '@nestjs/common';
import { ResenasService } from './resenas.service';
import { CreateResenaDto } from './dto/create-resena.dto';

@Controller('resenas')
export class ResenasController {
  constructor(private readonly resenasService: ResenasService) {}

  @Get()
  findAll(@Query('businessId') businessId?: string) {
    return this.resenasService.findAll(businessId ? Number(businessId) : undefined);
  }

  @Get('appointment/:appointmentId')
  findByAppointment(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    return this.resenasService.findByAppointment(appointmentId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.resenasService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateResenaDto) {
    return this.resenasService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resenasService.remove(id);
  }
}
