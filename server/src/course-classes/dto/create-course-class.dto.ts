import { semesters, Semester } from '@entities/course-class.entity';
import { IsInt, Min, IsIn } from 'class-validator';

export class CreateCourseClassDto {
  @IsInt({ message: 'Insira um ano válido.' })
  @Min(1970, { message: 'O ano deve ser maior ou igual a 1970.' })
  entryYear: number;

  @IsIn([...semesters], { message: 'Selecione um semestre válido.' })
  entrySemester: Semester;

  @IsInt({ message: 'Selecione um curso válido.' })
  @Min(1, { message: 'Selecione um curso válido.' })
  courseId: number;
}
