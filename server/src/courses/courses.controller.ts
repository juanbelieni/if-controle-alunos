import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';

import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async index() {
    return this.coursesService.findAll();
  }

  @Get('formations')
  async getCoursesFormations() {
    return this.coursesService.getFormations();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: number) {
    return this.coursesService.delete(id);
  }
}
