import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginNegociosDto {
  @ApiProperty({ example: '+34 600 000 000' })
  @IsString()
  @IsNotEmpty()
  Telefono: string;

  @ApiProperty({ example: 'secreto123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
