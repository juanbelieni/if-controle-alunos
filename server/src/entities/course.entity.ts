import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  AfterLoad,
} from 'typeorm';

export const formations = ['Integrado', 'Subsequente', 'Superior'] as const;
export type Formation = typeof formations[number];

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: formations })
  formation: Formation;

  @CreateDateColumn()
  createdAt: Date;

  course: string;

  @AfterLoad()
  afterLoad() {
    this.course = `${this.name} ${this.formation}`;
  }
}
