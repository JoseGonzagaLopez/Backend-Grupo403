import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Negocios')
export class Negocios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  Nombre: string;

  @Column({ type: 'text', nullable: true })
  Localicacion?: string;

  @Column({ type: 'text', nullable: true })
  Telefono?: string;

  @Column({ type: 'text', nullable: true })
  password?: string;
}
