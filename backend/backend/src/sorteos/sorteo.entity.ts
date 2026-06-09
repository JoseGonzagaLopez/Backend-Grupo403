import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Negocios } from '../negocios/negocios.entity';
import { Servicio } from '../servicios/servicio.entity';

@Entity('sorteos')
export class Sorteo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessId: number;

  @Column()
  nombre: string;

  @Column({ type: 'date' })
  fechaInicio: string;

  @Column({ type: 'date' })
  fechaFin: string;

  // Eligibility criteria (Past behavior)
  @Column({ type: 'int', default: 0 })
  minReservasPrevias: number;

  @Column({ type: 'real', default: 0 })
  minGastoPrevio: number;

  // Conditions during the raffle
  @Column({ type: 'int', default: 1 })
  condicionReservasDurante: number;

  // Array of service IDs as a JSON string. If empty/null, all services apply.
  @Column({ type: 'text', nullable: true })
  serviciosValidosId: string; 

  // Prize details
  @Column({ type: 'int' })
  premioServicioId: number;

  @Column({ type: 'int' })
  premioDescuento: number; // 1 to 100 percentage

  @Column({ type: 'int' })
  cantidadGanadores: number;

  @Column({ default: 'activo' }) // 'activo', 'finalizado', 'cancelado'
  estado: string;

  @ManyToOne(() => Negocios)
  @JoinColumn({ name: 'businessId' })
  negocio: Negocios;

  @ManyToOne(() => Servicio)
  @JoinColumn({ name: 'premioServicioId' })
  servicioPremio: Servicio;
}
