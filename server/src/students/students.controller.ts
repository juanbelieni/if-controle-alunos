import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { CreateStudentDto } from './dto/create-student.dto';
import { CreateStudentsDto } from './dto/create-students.dto';
import { FiltersDto } from './dto/filters.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getStudents(@Query('courseClassId') courseClassId: number | undefined) {
    if (isNaN(courseClassId)) {
      return this.studentsService.findAll();
    }
    return this.studentsService.findManyByCourseClassId(courseClassId);
  }

  @Get('filter')
  getStudentsByFilters(@Query() filtersDto: FiltersDto) {
    return this.studentsService.findManyByFilters(filtersDto);
  }

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createOne(createStudentDto);
  }

  @Post('many')
  createStudents(@Body() createStudentsDto: CreateStudentsDto) {
    return this.studentsService.createMany(createStudentsDto);
  }

  @Get('cities')
  getStudentsCities() {
    return this.studentsService.getCities();
  }

  @Get('races')
  getStudentsRaces() {
    return this.studentsService.getRaces();
  }

  @Get('genders')
  getStudentsGenders() {
    return this.studentsService.getGenders();
  }

  @Get('school-types')
  getStudentsSchoolTypes() {
    return this.studentsService.getSchoolTypes();
  }
}
