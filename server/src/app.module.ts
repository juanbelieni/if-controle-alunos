import { CourseClass } from '@entities/course-class.entity';
import { Course } from '@entities/course.entity';
import { Student } from '@entities/student.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseClassesModule } from './course-classes/course-classes.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [Student, Course, CourseClass],
      synchronize: true,
    }),
    StudentsModule,
    CoursesModule,
    CourseClassesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
