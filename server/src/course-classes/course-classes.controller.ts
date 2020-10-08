import { Controller, Get, Post, Body } from '@nestjs/common';

import { CourseClassesService } from './course-classes.service';
import { CreateCourseClassDto } from './dto/create-course-class.dto';

@Controller('course-classes')
export class CourseClassesController {
  constructor(private readonly courseClassesService: CourseClassesService) {}

  @Get()
  async index() {
    return await this.courseClassesService.findAll();
  }

  @Post()
  createCourseClass(@Body() createCourseClassDto: CreateCourseClassDto) {
    return this.courseClassesService.create(createCourseClassDto);
  }
}
