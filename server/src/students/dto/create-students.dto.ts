import { Type } from 'class-transformer';
import {
  IsString,
  Matches,
  IsISO8601,
  IsIn,
  IsInt,
  Min,
  ValidateNested,
  IsArray,
} from 'class-validator';

import {
  genders,
  Gender,
  races,
  Race,
  cities,
  City,
  schoolTypes,
  SchoolType,
} from '../../entities/student.entity';

class StudentDto {
  @IsString({ message: 'Insira um nome válido.' })
  name: string;

  @Matches(/[0-9]{12}/, { message: 'A matrícula precisa ter 12 digitos.' })
  matriculation: string;

  @IsISO8601(
    { strict: true },
    { message: 'Insira uma data de nascimento válida.' },
  )
  birthdate: string;

  @IsIn([...genders], {
    message: `O gênero informado não é: ${genders.join(', ')}.`,
  })
  gender: Gender;

  @IsIn([...races], {
    message: `A raça/etnia informada não é: ${races.join(', ')}.`,
  })
  race: Race;

  @IsIn([...cities], {
    message: `A cidade informada não é: ${cities.join(', ')}.`,
  })
  city: City;

  @IsIn([...schoolTypes], {
    message: `O tipo da escola de origem informada não é: ${schoolTypes.join(
      ', ',
    )}.`,
  })
  originSchoolType: SchoolType;
}

export class CreateStudentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students: StudentDto[];

  @IsInt({ message: 'Selecione uma turma válida.' })
  @Min(1, { message: 'Selecione uma turma válida.' })
  courseClassId: number;
}
