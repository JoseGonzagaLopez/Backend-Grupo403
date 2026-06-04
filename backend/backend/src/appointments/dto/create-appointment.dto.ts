import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { AppointmentStatus } from '../appointment.entity';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2026-04-20' })
  @IsString()
  date: string;

  @ApiProperty({ example: '10:30' })
  @IsString()
  time: string;

  @ApiProperty({ enum: AppointmentStatus, example: AppointmentStatus.PENDING })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @ApiProperty({ example: 1, description: 'ID del cliente (FK a tabla Clientes)' })
  @IsInt()
  customerId: number;

  @ApiProperty({ example: 1, description: 'ID del negocio (FK a tabla Negocios)' })
  @IsInt()
  businessId: number;

  @ApiProperty({ example: 'Corte de pelo' })
  @IsString()
  serviceName: string;

  @ApiProperty({ example: 30.5, description: 'Importe de la reserva' })
  @IsNumber()
  importe: number;
}