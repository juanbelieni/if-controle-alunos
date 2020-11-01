import { CourseClass } from '@entities/course-class.entity';
import { Student, races, genders, schoolTypes } from '@entities/student.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { CreateStudentDto } from './dto/create-student.dto';
import { CreateStudentsDto } from './dto/create-students.dto';

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

  async findManyByCourseClassId(courseClassId: number) {
    return this.studentsRepository.find({
      where: { courseClassId },
      cache: 2000,
    });
  }

  async createOne(createStudentDto: CreateStudentDto) {
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

  async createMany(createStudentsDto: CreateStudentsDto) {
    const { courseClassId, students } = createStudentsDto;

    const courseClass = await this.courseClassRepository.findOne(courseClassId);

    if (!courseClass) {
      throw new BadRequestException(
        'A turma selecionada não está presente no sistema.',
      );
    }

    const existintStudent = await this.studentsRepository.findOne({
      where: {
        matriculation: In(students.map((student) => student.matriculation)),
      },
    });

    if (existintStudent) {
      throw new BadRequestException('Matrícula(s) ja cadastrada no sistema.');
    }

    await this.studentsRepository.save(
      students.map((student) => ({ ...student, courseClass })),
    );
  }

  async getCities() {
    return (
      await this.studentsRepository
        .createQueryBuilder('student')
        .select('student.city')
        .groupBy('student.city')
        .cache(5000)
        .getRawMany()
    ).map((student) => student.student_city as string);
  }

  getRaces() {
    return races;
  }

  getGenders() {
    return genders;
  }

  getSchoolTypes() {
    return schoolTypes;
  }
}
