import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne ,
  BaseEntity, JoinTable
} from 'typeorm';
import { Users } from './Users';

@Entity()
export class Tareas extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion_tarea: string;

  @Column()
  estado_tarea: boolean;

@ManyToOne(() =>Users, users => users.tareas)
users: Users;

  // @ManyToMany(() => Planet)
  // @JoinTable()
  // planets: Planet[];
  
}