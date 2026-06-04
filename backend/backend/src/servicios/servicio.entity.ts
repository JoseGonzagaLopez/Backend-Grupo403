import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Servicios')
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nombre: string;

  @Column({ type: 'real', nullable: false })
  precio: number;

  @Column({ type: 'integer', nullable: true })
  duracion?: number;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'integer', nullable: true })
  businessId?: number;
}
