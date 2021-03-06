import { CourseClass } from '@entities/course-class.entity';
import { Course } from '@entities/course.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseClassDto } from './dto/create-course-class.dto';

@Injectable()
export class CourseClassesService {
  constructor(
    @InjectRepository(CourseClass)
    private readonly courseClassesRepository: Repository<CourseClass>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findManyByCourseId(courseId: number) {
    return this.courseClassesRepository.find({
      where: { courseId },
      relations: ['course'],
      cache: 2000,
    });
  }

  async findAll() {
    return this.courseClassesRepository.find({
      relations: ['course'],
      cache: 2000,
    });
  }

  async findOne(id: number) {
    return this.courseClassesRepository.findOne({
      where: { id },
      relations: ['course'],
      cache: 10000,
    });
  }

  async create(createCourseClassDto: CreateCourseClassDto) {
    const { entryYear, entrySemester, courseId } = createCourseClassDto;
    const course = await this.courseRepository.findOne(courseId);

    if (!course) {
      throw new BadRequestException(
        'O curso selecionado não está presente no sistema.',
      );
    }

    await this.courseClassesRepository.save({
      entryYear,
      entrySemester,
      course,
    });
  }

  async delete(id: number) {
    await this.courseClassesRepository.delete(id);
  }
}
