import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import FileInput from '../../components/file-input/file-input.component';
import PageContainer from '../../components/page-container/page-container.component';
import useFetch from '../../hooks/use-fetch.hook';
import useForm, { Errors } from '../../hooks/use-form.hook';
import api from '../../services/api.service';
import parseCSV from '../../utils/parse-csv.util';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    input: {
      width: '100%',
    },
    inputs: {
      marginBottom: theme.spacing(3),
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

interface Values {
  course: number | '';
  courseClass: number | '';
  file?: File;
}

const CreateStudentsPage: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();

  function validate(values: Values, errors: Errors<Values>) {
    if (values.course === '') {
      errors.course = true;
    }
    if (values.courseClass === '') {
      errors.courseClass = true;
    }
    if (!values.file) {
      errors.file = true;
    }

    return errors;
  }

  async function submit(values: Values) {
    const parsedCSV = await parseCSV(values.file as File, [
      'name',
      'matriculation',
      'city',
      'birthdate',
      'disability',
      'race',
      'entryForm',
      'gender',
      'originSchoolType',
    ]);

    await api.post('students/many', {
      courseClassId: values.courseClass,
      students: parsedCSV,
    });

    history.push('/alunos');
  }

  const { values, errors, handleChange, handleSubmit } = useForm<Values>(
    {
      course: '',
      courseClass: '',
    },
    validate,
    submit,
  );

  const [courses] = useFetch<Course[]>('courses');
  const [courseClasses] = useFetch<CourseClass[]>(
    values.course !== '' ? `course-classes?courseId=${values.course}` : null,
  );

  function handleSelectCourse(event: ChangeEvent<{ value: unknown }>) {
    handleChange('course', event.target.value as number);
  }

  function handleSelectCourseClass(event: ChangeEvent<{ value: unknown }>) {
    handleChange('courseClass', event.target.value as number);
  }

  function handleUploadFile(file: File | undefined) {
    handleChange('file', file);
  }

  return (
    <PageContainer
      isLoading={!courses || (values.course !== '' && !courseClasses)}
      maxWidth="md"
    >
      <Typography className={styles.title} variant="h4" component="h1">
        Adicionar alunos
      </Typography>

      <Grid container spacing={3} className={styles.inputs}>
        <Grid item xs={8}>
          <FormControl error={errors.course} className={styles.input}>
            <InputLabel>Curso</InputLabel>
            <Select onChange={handleSelectCourse}>
              {courses?.map(({ id, course }) => (
                <MenuItem value={id} key={id}>
                  {course}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Selecione um curso.</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl error={errors.courseClass} className={styles.input}>
            <InputLabel>Turma</InputLabel>
            <Select
              onChange={handleSelectCourseClass}
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
            <FormHelperText>Selecione uma turma.</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FileInput
            onChange={handleUploadFile}
            accept=".csv"
            error={errors.file}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disableElevation
      >
        Adicionar alunos
      </Button>
    </PageContainer>
  );
};

export default CreateStudentsPage;
