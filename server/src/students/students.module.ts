import { CourseClass } from '@entities/course-class.entity';
import { Student } from '@entities/student.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student, CourseClass])],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
