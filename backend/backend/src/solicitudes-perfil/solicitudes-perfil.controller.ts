import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SolicitudesPerfilService } from './solicitudes-perfil.service';

@ApiTags('solicitudes-perfil')
@Controller()
export class SolicitudesPerfilController {
  constructor(private readonly service: SolicitudesPerfilService) {}

  // POST /negocios/:id/solicitudes-perfil  (llamado desde el frontend de empresa)
  @Post('negocios/:id/solicitudes-perfil')
  @ApiCreatedResponse({ description: 'Solicitud de cambio de perfil creada' })
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { cambios: Record<string, any> },
  ) {
    return this.service.create(id, body.cambios);
  }

  // GET /solicitudes-perfil?estado=pending  (llamado desde el panel admin)
  @Get('solicitudes-perfil')
  @ApiOkResponse({ description: 'Listado de solicitudes de perfil' })
  findAll(@Query('estado') estado?: string) {
    return this.service.findAll(estado);
  }

  // PATCH /solicitudes-perfil/:id/aprobar  (admin aprueba)
  @Patch('solicitudes-perfil/:id/aprobar')
  @ApiOkResponse({ description: 'Solicitud aprobada y cambios aplicados al negocio' })
  aprobar(@Param('id', ParseIntPipe) id: number) {
    return this.service.aprobar(id);
  }

  // PATCH /solicitudes-perfil/:id/rechazar  (admin rechaza)
  @Patch('solicitudes-perfil/:id/rechazar')
  @ApiOkResponse({ description: 'Solicitud rechazada' })
  rechazar(@Param('id', ParseIntPipe) id: number) {
    return this.service.rechazar(id);
  }
}
