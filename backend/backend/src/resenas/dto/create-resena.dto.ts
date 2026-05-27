import { IsInt, IsOptional, IsString, Min, Max, IsNumber } from 'class-validator';

export class CreateResenaDto {
  @IsNumber()
  businessId: number;

  @IsOptional()
  @IsNumber()
  customerId?: number;

  @IsOptional()
  @IsNumber()
  appointmentId?: number;

  @IsOptional()
  @IsString()
  clienteNombre?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  puntuacion: number;

  @IsOptional()
  @IsString()
  comentario?: string;
}
