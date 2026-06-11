import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Negocios } from '../negocios/negocios.entity';
import { Clientes } from '../clientes/clientes.entity';
import { Servicio } from '../servicios/servicio.entity';

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

  @Column({ nullable: true })
  serviceId: number;

  @Column({ type: 'real', default: 0 })
  importe: number;

  @ManyToOne(() => Clientes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  cliente: Clientes;

  @ManyToOne(() => Negocios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'businessId' })
  negocio: Negocios;

  @ManyToOne(() => Servicio, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'serviceId' })
  servicio: Servicio;
}