import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Negocios } from '../negocios/negocios.entity';
import { Clientes } from '../clientes/clientes.entity';
import { Servicio } from '../servicios/servicio.entity';
import { Appointment } from '../appointments/appointment.entity';

@Entity('Pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  customerId: number;

  @Column()
  businessId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Importe: number;

  @Column({ type: 'text' })
  Metodo: string;

  @Column({ type: 'date' })
  Fecha: string;

  @Column({ type: 'text' })
  Estado: string;

  @ManyToOne(() => Clientes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  cliente: Clientes;

  @ManyToOne(() => Negocios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'businessId' })
  negocio: Negocios;

  @Column({ nullable: true })
  serviceId: number;

  @Column({ nullable: true })
  appointmentId: number;

  @ManyToOne(() => Servicio, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'serviceId' })
  servicio: Servicio;

  @ManyToOne(() => Appointment, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'appointmentId' })
  reserva: Appointment;
}