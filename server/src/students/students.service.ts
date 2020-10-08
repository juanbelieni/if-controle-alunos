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
  ) {}

  async findAll() {
    return this.studentsRepository.find({
      cache: 5000,
    });
  }

  async create(createStudentDto: CreateStudentDto) {
    const existintStudent = this.studentsRepository.findOne({
      where: {
        matriculation: createStudentDto.matriculation,
      },
    });

    if (existintStudent) {
      throw new BadRequestException('Matrícula ja cadastrada no sistema.');
    }
    await this.studentsRepository.save(createStudentDto);
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
