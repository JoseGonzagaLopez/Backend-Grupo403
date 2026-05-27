import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Resenas')
export class Resena {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  businessId: number;

  @Column({ type: 'int', nullable: true })
  customerId: number;

  @Column({ type: 'int', nullable: true })
  appointmentId: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  clienteNombre: string;

  @Column({ type: 'int' })
  puntuacion: number; // 1-5

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn()
  fecha: Date;
}
