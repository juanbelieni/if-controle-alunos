import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';

import Navbar from '../../components/navbar/navbar.component';
import Table from '../../components/table/table.component';
import useFetch from '../../hooks/use-fetch.hook';

interface Student {
  name: string;
  matriculation: string;
  race: string;
  gender: string;
  birthdate: string;
  city: string;
  originSchoolType: string;
  courseClass: {
    courseClass: string;
  };
}

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(3),
      flexGrow: 1,
    },
  }),
);

const StudentsPage: React.FC = () => {
  const styles = useStyles();

  const [students, isStudentsValidating, revalidateStudents] = useFetch<
    Student[]
  >('students');

  // const [races, isRacesValidating] = useFetch<{ [key: string]: string }>(
  //   'students/races',
  //   (data: string[]) =>
  //     data.reduce((object, race) => ({ ...object, [race]: race }), {}),
  // );

  // const [genders, isGendersValidating] = useFetch<{ [key: string]: string }>(
  //   'students/genders',
  //   (data: string[]) =>
  //     data.reduce((object, gender) => ({ ...object, [gender]: gender }), {}),
  // );

  // const [schoolTypes, isSchoolTypesValidating] = useFetch<{
  //   [key: string]: string;
  // }>('students/school-types', (data: string[]) =>
  //   data.reduce(
  //     (object, schoolType) => ({ ...object, [schoolType]: schoolType }),
  //     {},
  //   ),
  // );

  // const [cities, isCitiesValidating] = useFetch<{ [key: string]: string }>(
  //   'students/cities',
  //   (data: string[]) =>
  //     data.reduce((object, city) => ({ ...object, [city]: city }), {}),
  // );

  // useEffect(() => {
  //   console.log(isStudentsValidating);
  //   setIsLoading(
  //     isStudentsValidating ||
  //       isCitiesValidating ||
  //       isGendersValidating ||
  //       isRacesValidating ||
  //       isSchoolTypesValidating,
  //   );
  // }, [
  //   isStudentsValidating,
  //   isCitiesValidating,
  //   isGendersValidating,
  //   isRacesValidating,
  //   isSchoolTypesValidating,
  // ]);

  return (
    <>
      <Navbar />
      <main>
        <Container className={styles.table}>
          <Table<Student>
            title="Alunos"
            onRefrechClick={revalidateStudents}
            data={students || []}
            isLoading={isStudentsValidating}
            columns={[
              { title: 'Nome', field: 'name' },
              { title: 'Matrícula', field: 'matriculation' },
              { title: 'Raça/etnia', field: 'race' },
              { title: 'Sexo', field: 'gender' },
              {
                title: 'Data de nascimento',
                field: 'birthdate',
                render: ({ birthdate }) => {
                  const [year, month, day] = birthdate.split('-');
                  return `${day}/${month}/${year}`;
                },
              },
              { title: 'Cidade', field: 'city' },
              {
                title: 'Escola de origem',
                field: 'originSchoolType',
              },
              { title: 'Turma', field: 'courseClass.courseClass' },
            ]}
          />
        </Container>
      </main>
    </>
  );
};

export default StudentsPage;
