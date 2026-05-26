import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SolicitudesPerfil')
export class SolicitudesPerfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  businessId: number;

  @Column({ type: 'text' })
  cambiosJson: string; // JSON.stringify del objeto de cambios

  @Column({ type: 'text', default: 'pending' })
  estado: 'pending' | 'approved' | 'rejected';

  @CreateDateColumn()
  createdAt: Date;

  get cambios(): Record<string, any> {
    try { return JSON.parse(this.cambiosJson); } catch { return {}; }
  }
}
