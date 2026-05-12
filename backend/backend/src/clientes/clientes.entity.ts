import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}