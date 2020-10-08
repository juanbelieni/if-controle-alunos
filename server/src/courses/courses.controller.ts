import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateCourseDto } from 'src/courses/dto/create-course.dto';

import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async index() {
    return await this.coursesService.findAll();
  }

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
}
