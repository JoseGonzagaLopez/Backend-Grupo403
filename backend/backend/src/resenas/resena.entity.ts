import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessId: number;

  @Column({ nullable: true })
  customerId: number;

  @Column({ nullable: true })
  appointmentId: number;

  @Column({ nullable: true })
  clienteNombre: string;

  @Column()
  puntuacion: number;

  @Column({ nullable: true })
  comentario: string;

  @Column({ default: () => "datetime('now')" })
  fecha: string;
}
