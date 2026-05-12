import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClientesDto } from './dto/create-clientes.dto';
import { UpdateClientesDto } from './dto/update-clientes.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cliente creado' })
  create(@Body() createClientesDto: CreateClientesDto) {
    return this.clientesService.create(createClientesDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Listado de clientes' })
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalle de un cliente' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Cliente actualizado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientesDto: UpdateClientesDto,
  ) {
    return this.clientesService.update(id, updateClientesDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Cliente eliminado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.remove(id);
  }
}