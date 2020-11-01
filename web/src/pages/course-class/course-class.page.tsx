import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import { useParams } from 'react-router-dom';

import DataCard from '../../components/data-card/data-card.component';
import PageContainer from '../../components/page-container/page-container.component';
import Table from '../../components/table/table.component';
import useFetch from '../../hooks/use-fetch.hook';
import api from '../../services/api.service';

interface Course {
  name: string;
  formation: string;
  course: string;
}

interface CourseClass {
  id: number;
  entryYear: number;
  entrySemester: string;
  course: Course;
  courseClass: string;
}

interface Student {
  name: string;
  matriculation: string;
  race: string;
  gender: string;
  birthdate: string;
  city: string;
  originSchoolType: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    select: {
      fontSize: '13px',
      width: '100%',
    },
  }),
);

const CourseClassPage: React.FC = () => {
  const styles = useStyles();
  const { id } = useParams();

  const [courseClass] = useFetch<CourseClass>(
    `course-classes/${id}`,
    (courseClass) => ({
      ...courseClass,
      entrySemester:
        courseClass.entrySemester === 0
          ? 'Anual'
          : `${courseClass.entrySemester}º semestre`,
    }),
  );

  const [students, isStudentsValidating, revalidateStudents] = useFetch<
    Student[]
  >(`students?courseClassId=${id}`);

  // async function createCourseClass(data: CourseClass) {
  //   await api.post('course-classes', {
  //     entryYear: Number(data.entryYear),
  //     entrySemester: data.entrySemester,
  //     courseId: Number(id),
  //   });
  //   await revalidateCourseClasses();
  // }

  // async function deleteCourseClass(data: CourseClass) {
  //   await api.delete(`course-classes/${data.id}`);
  //   await revalidateCourseClasses();
  // }

  return (
    <PageContainer isLoading={!courseClass}>
      <Typography variant="h4" component="h1">
        {courseClass?.courseClass}
      </Typography>
      <List className={styles.list}>
        <DataCard
          title="Curso"
          description={courseClass?.course.course}
          icon="local_offer"
        />
        <DataCard
          title="Ano de entrada"
          description={courseClass?.entryYear}
          icon="today"
        />
        <DataCard
          title="Semestre de entrada"
          description={courseClass?.entrySemester}
          icon="today"
        />
      </List>
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
          },
          { title: 'Cidade', field: 'city' },
          {
            title: 'Escola de origem',
            field: 'originSchoolType',
          },
        ]}
      />
    </PageContainer>
  );
};

export default CourseClassPage;
