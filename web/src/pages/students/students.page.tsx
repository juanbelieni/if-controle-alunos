import React from 'react';

import PageContainer from '../../components/page-container/page-container.component';
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

const StudentsPage: React.FC = () => {
  const [students, isStudentsValidating, revalidateStudents] = useFetch<
    Student[]
  >('students');

  return (
    <PageContainer>
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
    </PageContainer>
  );
};

export default StudentsPage;
