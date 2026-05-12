import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, IsNotEmpty } from 'class-validator';

export class CreateClientesDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @ApiProperty({ example: '600123456' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{9}$/, { message: 'El teléfono debe tener 9 números' })
  Telefono: string;

  @ApiProperty({ example: 'juan@email.com' })
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  @IsNotEmpty()
  Correo: string;
}