import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePagoDto {
  @ApiProperty({ example: 1, description: 'ID del cliente (FK a tabla Clientes)' })
  @IsInt()
  customerId: number;

  @ApiProperty({ example: 1, description: 'ID del negocio (FK a tabla Negocios)' })
  @IsInt()
  businessId: number;

  @ApiProperty({ example: 50.5 })
  @IsNumber()
  Importe: number;

  @ApiProperty({ example: 'Tarjeta' })
  @IsString()
  Metodo: string;

  @ApiProperty({ example: '2026-05-12' })
  @IsString()
  Fecha: string;

  @ApiProperty({ example: 'Completado' })
  @IsString()
  Estado: string;

  @ApiProperty({ example: 1, description: 'ID del servicio asociado', required: false })
  @IsOptional()
  @IsInt()
  serviceId?: number;

  @ApiProperty({ example: 1, description: 'ID de la reserva asociada', required: false })
  @IsOptional()
  @IsInt()
  appointmentId?: number;
}