import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';

import { CourseClassesService } from './course-classes.service';
import { CreateCourseClassDto } from './dto/create-course-class.dto';

@Controller('course-classes')
export class CourseClassesController {
  constructor(private readonly courseClassesService: CourseClassesService) {}

  @Get()
  async index(@Query('courseId') courseId: number | undefined) {
    if (isNaN(courseId)) {
      return this.courseClassesService.findAll();
    }
    return this.courseClassesService.findOneByCourseId(courseId);
  }

  @Post()
  createCourseClass(@Body() createCourseClassDto: CreateCourseClassDto) {
    return this.courseClassesService.create(createCourseClassDto);
  }

  @Delete(':id')
  deleteCourseClass(@Param('id') id: number) {
    return this.courseClassesService.delete(id);
  }
}
