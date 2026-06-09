import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max, IsDateString } from 'class-validator';

export class CreateSorteoDto {
  @IsNotEmpty()
  @IsNumber()
  businessId: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minReservasPrevias?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minGastoPrevio?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  condicionReservasDurante?: number;

  @IsOptional()
  @IsString()
  serviciosValidosId?: string;

  @IsNotEmpty()
  @IsNumber()
  premioServicioId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  premioDescuento: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  cantidadGanadores: number;
}
