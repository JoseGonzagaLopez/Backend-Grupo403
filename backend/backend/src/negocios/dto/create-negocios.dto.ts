import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNegociosDto {
  @ApiProperty({ example: 'Peluquería Estilo' })
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @ApiProperty({ example: 'Calle Falsa 123', required: false })
  @IsOptional()
  @IsString()
  Localicacion?: string;

  @ApiProperty({ example: '+34 600 000 000', required: false })
  @IsOptional()
  @IsString()
  Telefono?: string;

  @ApiProperty({ example: 'miContrasena123', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tipoNegocio?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bannerUrl?: string;
}
