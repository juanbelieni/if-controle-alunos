import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';

import PageContainer from '../../components/page-container/page-container.component';
import Table from '../../components/table/table.component';
import useFetch from '../../hooks/use-fetch.hook';
import api from '../../services/api.service';

interface Course {
  id: number;
  name: string;
  formation: string;
  course: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      paddingTop: theme.spacing(3),
    },
    select: {
      fontSize: '13px',
      width: '100%',
    },
  }),
);

const CoursesPage: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();

  const [courses, isCoursesValidating, revalidateCourses] = useFetch<Course[]>(
    'courses',
  );

  const [formations, isFormationsValidating] = useFetch<string[]>(
    'courses/formations',
  );

  async function createCourse(data: Course) {
    await api.post('/courses', data);
    await revalidateCourses();
  }

  async function deleteCourse(data: Course) {
    await api.delete(`/courses/${data.id}`);
    await revalidateCourses();
  }

  function navigateToCourse(data: Course) {
    history.push(`/cursos/${data.id}`);
  }

  return (
    <PageContainer>
      <Table<Course>
        title="Cursos"
        onRefrechClick={revalidateCourses}
        data={courses || []}
        isLoading={isCoursesValidating || isFormationsValidating}
        editable={{
          onRowAdd: createCourse,
          onRowDelete: deleteCourse,
        }}
        actions={[
          {
            icon: 'launch',
            tooltip: 'Mostrar',
            onClick: (_, course) => navigateToCourse(course as Course),
          },
        ]}
        columns={[
          { title: 'Nome', field: 'name' },
          {
            title: 'Formação',
            field: 'formation',
            editComponent: ({ onChange, value }) => (
              <Select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className={styles.select}
              >
                {formations?.map((formation) => (
                  <MenuItem value={formation} key={formation}>
                    {formation}
                  </MenuItem>
                ))}
              </Select>
            ),
          },
        ]}
      />
    </PageContainer>
  );
};

export default CoursesPage;
