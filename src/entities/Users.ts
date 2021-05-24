import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable, OneToMany
} from 'typeorm';
import { Tareas } from './Tareas';

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Tareas, tareas => tareas.users)
  tareas: Tareas[]
  // @ManyToMany(() => Planet)
  // @JoinTable()
  // planets: Planet[];
  
}