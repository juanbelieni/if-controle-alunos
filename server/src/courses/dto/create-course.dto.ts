import { IsString, IsIn } from 'class-validator';

import { formations, Formation } from '../../entities/course.entity';

export class CreateCourseDto {
  @IsString({ message: 'Insira um nome válido.' })
  name: string;

  @IsIn([...formations], {
    message: `A formação informado não é: ${formations.join(', ')}.`,
  })
  formation: Formation;
}
