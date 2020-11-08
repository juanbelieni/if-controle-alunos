import { IsString, IsInt, Min, IsIn, IsArray } from 'class-validator';

import {
  genders,
  Gender,
  races,
  Race,
  schoolTypes,
  SchoolType,
} from '../../entities/student.entity';

export class FiltersDto {
  @IsArray()
  @IsIn([...genders], {
    message: `O gênero informado não é: ${genders.join(', ')}.`,
    each: true,
  })
  genders: Gender[];

  @IsArray()
  @IsIn([...races], {
    message: `A raça/etnia informada não é: ${races.join(', ')}.`,
    each: true,
  })
  races: Race[];

  @IsArray()
  @IsString({
    message: `Insira uma cidade válida.`,
    each: true,
  })
  cities: string[];

  @IsArray()
  @IsIn([...schoolTypes], {
    message: `O tipo da escola de origem informada não é: ${schoolTypes.join(
      ', ',
    )}.`,
    each: true,
  })
  originSchoolTypes: SchoolType[];

  @IsArray()
  @IsString({
    message: `Insira uma turma válida.`,
    each: true,
  })
  courseClasses: string[];
}
