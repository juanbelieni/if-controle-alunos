import { formations, Course } from '@entities/course.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async findAll() {
    return this.coursesRepository.find({
      cache: 2000,
    });
  }

  async findOne(id: number) {
    return this.coursesRepository.findOne({
      where: { id },
      relations: ['courseClasses'],
      cache: 2000,
    });
  }

  async create(createCourseDto: CreateCourseDto) {
    await this.coursesRepository.save(createCourseDto);
  }

  async delete(id: number) {
    await this.coursesRepository.delete(id);
  }

  getFormations() {
    return formations;
  }
}
