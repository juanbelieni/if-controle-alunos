import { IsString, Matches, IsISO8601, IsIn } from 'class-validator';

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

export class CreateStudentDto {
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
    message: `A cidade informada não é: ${cities.join(', ')}.`,
  })
  originSchoolType: SchoolType;
}
