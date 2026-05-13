import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Negocios')
export class Negocios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  Nombre: string;
}