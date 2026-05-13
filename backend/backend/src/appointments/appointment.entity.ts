import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Negocios } from '../negocios/negocios.entity';
import { Clientes } from '../clientes/clientes.entity';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  time: string;

  @Column({ type: 'text', default: AppointmentStatus.PENDING })
  status: AppointmentStatus;

  @Column()
  customerId: number;

  @Column()
  businessId: number;

  @Column()
  serviceName: string;

  @ManyToOne(() => Clientes)
  @JoinColumn({ name: 'customerId' })
  cliente: Clientes;

  @ManyToOne(() => Negocios)
  @JoinColumn({ name: 'businessId' })
  negocio: Negocios;
}