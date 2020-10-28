import { IsString, Matches, IsIn, IsInt, Min } from 'class-validator';

import {
  genders,
  Gender,
  races,
  Race,
  schoolTypes,
  SchoolType,
} from '../../entities/student.entity';

export class CreateStudentDto {
  @IsString({ message: 'Insira um nome válido.' })
  name: string;

  @Matches(/[0-9]{12}/, { message: 'A matrícula precisa ter 12 digitos.' })
  matriculation: string;

  @Matches(/[0-3]?[0-9]\/[0-1]?[0-9]\/(19|20)[0-9]{2}/, {
    message: 'Insira uma data de nascimento válida.',
  })
  birthdate: string;

  @IsString({
    message: `Insira uma deficiência válida.`,
  })
  disability: string;

  @IsIn([...genders], {
    message: `O gênero informado não é: ${genders.join(', ')}.`,
  })
  gender: Gender;

  @IsIn([...races], {
    message: `A raça/etnia informada não é: ${races.join(', ')}.`,
  })
  race: Race;

  @IsString({
    message: `Insira uma cidade válida.`,
  })
  city: string;

  @IsString({
    message: `Insira uma forma de entrada válida.`,
  })
  entryForm: string;

  @IsIn([...schoolTypes], {
    message: `O tipo da escola de origem informada não é: ${schoolTypes.join(
      ', ',
    )}.`,
  })
  originSchoolType: SchoolType;

  @IsInt({ message: 'Selecione uma turma válida.' })
  @Min(1, { message: 'Selecione uma turma válida.' })
  courseClassId: number;
}
