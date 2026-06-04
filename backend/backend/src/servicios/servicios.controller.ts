import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Get()
  findAll(@Query('businessId') businessId?: string) {
    if (businessId) {
      return this.serviciosService.findByBusiness(Number(businessId));
    }
    return this.serviciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.findOne(id);
  }

  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.create(createServicioDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateServicioDto: UpdateServicioDto) {
    return this.serviciosService.update(id, updateServicioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.remove(id);
  }
}
