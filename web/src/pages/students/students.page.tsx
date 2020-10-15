import React from 'react';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [students, isStudentsValidating, revalidateStudents] = useFetch<
    Student[]
  >('students');

  function navigateToCreateStudents() {
    history.push('alunos/adicionar');
  }

  return (
    <PageContainer>
      <Table<Student>
        title="Alunos"
        onRefrechClick={revalidateStudents}
        data={students || []}
        isLoading={isStudentsValidating}
        actions={[
          {
            icon: 'group_add',
            tooltip: 'Adicionar alunos (CSV)',
            isFreeAction: true,
            onClick: navigateToCreateStudents,
          },
        ]}
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
