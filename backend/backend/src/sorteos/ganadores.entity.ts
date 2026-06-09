import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Clientes } from '../clientes/clientes.entity';
import { Sorteo } from './sorteo.entity';

@Entity('ganadores_sorteo')
export class GanadorSorteo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sorteoId: number;

  @Column()
  customerId: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fechaGanado: string;

  @Column({ default: false })
  premioReclamado: boolean;

  @ManyToOne(() => Sorteo)
  @JoinColumn({ name: 'sorteoId' })
  sorteo: Sorteo;

  @ManyToOne(() => Clientes)
  @JoinColumn({ name: 'customerId' })
  cliente: Clientes;
}
