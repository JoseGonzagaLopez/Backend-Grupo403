import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Pagos') // Usamos el nombre exacto de tu tabla
export class Pago {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'text' })
  Cliente: string;

  @Column({ type: 'text' })
  Comercio: string;

  // TypeORM maneja números con decimales. 'decimal' o 'real' simulan el tipo Money en SQLite
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Importe: number;

  @Column({ type: 'text' })
  Metodo: string;

  @Column({ type: 'date' })
  Fecha: string;

  @Column({ type: 'text' })
  Estado: string;
}