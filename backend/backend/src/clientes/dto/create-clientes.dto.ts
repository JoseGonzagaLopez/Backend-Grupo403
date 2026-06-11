import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClientesDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @ApiProperty({ example: '600123456' })
  @IsString()
  @IsNotEmpty()
  Telefono: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty()
  Correo: string;

  @ApiProperty({ example: 'juanperez', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'password123', required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
