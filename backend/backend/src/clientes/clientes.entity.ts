import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity('Clientes')
export class Clientes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  Nombre: string;

  @Column({ type: 'text', nullable: false })
  Telefono: string;

  @Column({ type: 'text', nullable: false })
  Correo: string;

  @OneToMany(() => Appointment, (appointment) => appointment.cliente)
  appointments: Appointment[];
}