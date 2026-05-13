import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNegociosDto {
  @ApiProperty({ example: 'Peluquería Estilo' })
  @IsString()
  @IsNotEmpty()
  Nombre: string;
}