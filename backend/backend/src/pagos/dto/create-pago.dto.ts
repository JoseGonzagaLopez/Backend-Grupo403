import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePagoDto {
  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  Cliente: string;

  @ApiProperty({ example: 'Tienda Central' })
  @IsString()
  Comercio: string;

  @ApiProperty({ example: 150.50 })
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
}