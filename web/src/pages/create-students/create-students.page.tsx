import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useState, ChangeEvent } from 'react';

import FileInput from '../../components/file-input/file-input.component';
import PageContainer from '../../components/page-container/page-container.component';
import useFetch from '../../hooks/use-fetch.hook';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    selectsContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridColumnGap: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
  }),
);

interface CourseClass {
  id: number;
  entryYear: number;
  entrySemester: number;
}

interface Course {
  id: number;
  course: string;
}

const CreateStudentsPage: React.FC = () => {
  const styles = useStyles();

  const [selectedCourse, setSelectedCourse] = useState<number | ''>('');
  const [selectedCourseClass, setSelectedCourseClass] = useState<number | ''>(
    '',
  );
  const [file, setFile] = useState<File>();

  const [courses, isCoursesValidating] = useFetch<Course[]>('courses');
  const [courseClasses, isCourseClassesValidating] = useFetch<CourseClass[]>(
    selectedCourse !== '' ? `course-classes?courseId=${selectedCourse}` : null,
  );

  function selectCourse(event: ChangeEvent<{ value: unknown }>) {
    setSelectedCourse(event.target.value as number);
  }

  function selectCourseClass(event: ChangeEvent<{ value: unknown }>) {
    setSelectedCourseClass(event.target.value as number);
  }

  return (
    <PageContainer
      isLoading={isCoursesValidating || isCourseClassesValidating}
      maxWidth="md"
    >
      <Typography className={styles.title} variant="h4" component="h1">
        Adicionar alunos
      </Typography>

      <div className={styles.selectsContainer}>
        <FormControl>
          <InputLabel>Selecione um curso</InputLabel>
          <Select value={selectedCourse} onChange={selectCourse}>
            {courses?.map(({ id, course }) => (
              <MenuItem value={id} key={id}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Selecione uma turma</InputLabel>
          <Select
            value={selectedCourseClass}
            onChange={selectCourseClass}
            disabled={!courseClasses}
          >
            {courseClasses?.map(({ id, entryYear, entrySemester }) => (
              <MenuItem value={id} key={id}>
                {`${entryYear}${
                  entrySemester !== 0 ? `/${entrySemester}` : ''
                }`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <FileInput onChange={setFile} accept=".csv" />
    </PageContainer>
  );
};

export default CreateStudentsPage;
