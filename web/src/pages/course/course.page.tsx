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
  entrySemester: number;
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

const CoursePage: React.FC = () => {
  const styles = useStyles();
  const { id } = useParams();

  const [course, isCourseRevalidating] = useFetch<Course>(`courses/${id}`);

  const [
    courseClasses,
    isCourseClassesRevalidating,
    revalidateCourseClasses,
  ] = useFetch<CourseClass[]>(`course-classes?courseId=${id}`);

  async function createCourseClass(data: CourseClass) {
    await api.post('course-classes', {
      entryYear: Number(data.entryYear),
      entrySemester: Number(data.entrySemester),
      courseId: Number(id),
    });
    await revalidateCourseClasses();
  }

  async function deleteCourseClass(data: CourseClass) {
    await api.delete(`course-classes/${data.id}`);
    await revalidateCourseClasses();
  }

  return (
    <PageContainer isLoading={isCourseRevalidating}>
      <Typography variant="h4" component="h1">
        {course?.course}
      </Typography>
      <List className={styles.list}>
        <DataCard title="Nome" description={course?.name} icon="local_offer" />
        <DataCard
          title="Formação"
          description={course?.formation}
          icon="school"
        />
      </List>
      <Table<CourseClass>
        title="Turmas"
        data={courseClasses || []}
        isLoading={isCourseClassesRevalidating}
        onRefrechClick={revalidateCourseClasses}
        editable={{
          onRowAdd: createCourseClass,
          onRowDelete: deleteCourseClass,
        }}
        columns={[
          {
            title: 'Ano de ingresso',
            field: 'entryYear',
          },
          {
            title: 'Semestre de ingresso',
            field: 'entrySemester',
            lookup: {
              0: 'Anual',
              1: '1º semestre',
              2: '2º semestre',
            },
            editComponent: ({ onChange, value }) => (
              <Select
                value={value || '0'}
                onChange={(e) => onChange(e.target.value)}
                className={styles.select}
              >
                <MenuItem value="0">Anual</MenuItem>
                <MenuItem value="1">1º semestre</MenuItem>
                <MenuItem value="2">2º semestre</MenuItem>
              </Select>
            ),
          },
        ]}
      />
    </PageContainer>
  );
};

export default CoursePage;
