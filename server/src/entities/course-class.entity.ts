import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  AfterLoad,
} from 'typeorm';

import { Course } from './course.entity';

export const semesters = [0, 1, 2] as const;
export type Semester = typeof semesters[number];

@Entity()
export class CourseClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('year')
  entryYear: number;

  @Column({ type: 'enum', enum: semesters, default: semesters[0] })
  entrySemester: Semester;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Course, { nullable: false })
  course: Course;

  @Column({ nullable: false })
  courseId: number;

  courseClass: string;

  @AfterLoad()
  afterLoad() {
    if (this.course) {
      this.courseClass = `${this.course.course} - ${this.entryYear}${
        this.entrySemester !== 0 ? `/${this.entrySemester}` : ''
      }`;
    }
  }
}
