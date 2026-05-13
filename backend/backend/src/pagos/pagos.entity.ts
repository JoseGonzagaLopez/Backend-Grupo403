import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Negocios } from '../negocios/negocios.entity';
import { Clientes } from '../clientes/clientes.entity';

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

  @ManyToOne(() => Clientes)
  @JoinColumn({ name: 'customerId' })
  cliente: Clientes;

  @ManyToOne(() => Negocios)
  @JoinColumn({ name: 'businessId' })
  negocio: Negocios;
}