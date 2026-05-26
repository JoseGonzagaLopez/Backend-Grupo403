import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateServicioDto {
  @ApiProperty({ example: 'Corte de pelo' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 25.0 })
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty({ example: 60, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  duracion?: number;

  @ApiProperty({ example: 'Descripción del servicio', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  businessId?: number;
}
