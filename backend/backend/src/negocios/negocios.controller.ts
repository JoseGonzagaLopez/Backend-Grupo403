import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode } from '@nestjs/common';
import { NegociosService } from './negocios.service';
import { CreateNegociosDto } from './dto/create-negocios.dto';
import { UpdateNegociosDto } from './dto/update-negocios.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

class LoginNegocioDto {
  @IsEmail() Correo: string;
  @IsString() @IsNotEmpty() password: string;
}

@ApiTags('negocios')
@Controller('negocios')
export class NegociosController {
  constructor(private readonly negociosService: NegociosService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'Negocio registrado' })
  register(@Body() createNegociosDto: CreateNegociosDto) {
    return this.negociosService.register(createNegociosDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Login de negocio' })
  login(@Body() body: LoginNegocioDto) {
    return this.negociosService.login(body.Correo, body.password);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Negocio creado' })
  create(@Body() createNegociosDto: CreateNegociosDto) {
    return this.negociosService.create(createNegociosDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Listado de negocios' })
  findAll() {
    return this.negociosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalle de un negocio' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.negociosService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Negocio actualizado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNegociosDto: UpdateNegociosDto,
  ) {
    return this.negociosService.update(id, updateNegociosDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Negocio eliminado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.negociosService.remove(id);
  }
}
