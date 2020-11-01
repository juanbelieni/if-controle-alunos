import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { CourseClass } from './course-class.entity';

export const genders = ['Masculino', 'Feminino', 'Não especificado'] as const;
export type Gender = typeof genders[number];

export const races = ['Preta', 'Branca', 'Parda', 'Indígena'] as const;
export type Race = typeof races[number];

export const schoolTypes = ['Pública', 'Privada'] as const;
export type SchoolType = typeof schoolTypes[number];

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, length: 12 })
  matriculation: string;

  @Column()
  birthdate: string;

  @Column()
  disability: string;

  @Column({ type: 'enum', enum: genders })
  gender: Gender;

  @Column({ type: 'enum', enum: races })
  race: Race;

  @Column()
  city: string;

  @Column({ type: 'enum', enum: schoolTypes })
  originSchoolType: SchoolType;

  @Column()
  entryForm: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false })
  courseClassId: number;

  @ManyToOne(() => CourseClass, { nullable: false })
  courseClass: CourseClass;
}
