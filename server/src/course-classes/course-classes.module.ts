import { CourseClass } from '@entities/course-class.entity';
import { Course } from '@entities/course.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseClassesController } from './course-classes.controller';
import { CourseClassesService } from './course-classes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseClass])],
  controllers: [CourseClassesController],
  providers: [CourseClassesService],
})
export class CourseClassesModule {}
