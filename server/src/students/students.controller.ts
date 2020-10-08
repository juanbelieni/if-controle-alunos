import { Controller, Post, Body, Get } from '@nestjs/common';

import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  index() {
    return this.studentsService.findAll();
  }

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get('races')
  getStudentsRaces() {
    return this.studentsService.getRaces();
  }

  @Get('genders')
  getStudentsGenders() {
    return this.studentsService.getGenders();
  }

  @Get('cities')
  getStudentsCities() {
    return this.studentsService.getCities();
  }

  @Get('school-types')
  getStudentsSchoolTypes() {
    return this.studentsService.getSchoolTypes();
  }
}
