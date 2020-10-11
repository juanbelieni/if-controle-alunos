import { CourseClass } from '@entities/course-class.entity';
import {
  Student,
  races,
  genders,
  cities,
  schoolTypes,
} from '@entities/student.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(CourseClass)
    private readonly courseClassRepository: Repository<CourseClass>,
  ) {}

  async findAll() {
    return this.studentsRepository.find({
      join: {
        alias: 'student',
        leftJoinAndSelect: {
          courseClass: 'student.courseClass',
          course: 'courseClass.course',
        },
      },
      cache: 2000,
    });
  }

  async create(createStudentDto: CreateStudentDto) {
    const { courseClassId, ...studentData } = createStudentDto;

    const existintStudent = await this.studentsRepository.findOne({
      where: {
        matriculation: studentData.matriculation,
      },
    });

    if (existintStudent) {
      throw new BadRequestException('Matrícula ja cadastrada no sistema.');
    }

    const courseClass = await this.courseClassRepository.findOne(courseClassId);

    if (!courseClass) {
      throw new BadRequestException(
        'A turma selecionada não está presente no sistema.',
      );
    }

    await this.studentsRepository.save({
      ...studentData,
      courseClass,
    });
  }

  getRaces() {
    return races;
  }

  getCities() {
    return cities;
  }

  getGenders() {
    return genders;
  }

  getSchoolTypes() {
    return schoolTypes;
  }
}
