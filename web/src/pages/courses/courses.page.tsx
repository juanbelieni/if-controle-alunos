import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';

import Navbar from '../../components/navbar/navbar.component';
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
      fontSize: theme.typography.body2.fontSize,
      width: '100%',
    },
  }),
);

const CoursesPage: React.FC = () => {
  const styles = useStyles();

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

  return (
    <>
      <Navbar />
      <main>
        <Container className={styles.table}>
          <Table<Course>
            title="Cursos"
            onRefrechClick={revalidateCourses}
            data={courses || []}
            isLoading={isCoursesValidating || isFormationsValidating}
            editable={{
              onRowAdd: createCourse,
              onRowDelete: deleteCourse,
            }}
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
        </Container>
      </main>
    </>
  );
};

export default CoursesPage;
