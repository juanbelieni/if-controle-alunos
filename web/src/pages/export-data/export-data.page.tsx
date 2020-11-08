import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { saveAs } from 'file-saver';
import React from 'react';

import PageContainer from '../../components/page-container/page-container.component';
import useFetch from '../../hooks/use-fetch.hook';
import useForm, { Errors } from '../../hooks/use-form.hook';
import api from '../../services/api.service';
import createCSV from '../../utils/create-csv.util';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    selects: {
      marginBottom: theme.spacing(3),
    },
  }),
);

interface Course {
  id: number;
  course: string;
  formation: string;
}

interface CourseClass {
  id: number;
  courseClass: string;
  course: Course;
}

interface Values {
  courseClasses: number[];
  races: string[];
  genders: string[];
  cities: string[];
  originSchoolTypes: string[];
}

export default function ExportDataPage() {
  const styles = useStyles();

  function validate(values: Values, errors: Errors<Values>) {
    if (values.courseClasses.length < 1) {
      errors.courseClasses = true;
    }
    if (values.races.length < 1) {
      errors.races = true;
    }
    if (values.genders.length < 1) {
      errors.genders = true;
    }
    if (values.cities.length < 1) {
      errors.cities = true;
    }
    if (values.originSchoolTypes.length < 1) {
      errors.originSchoolTypes = true;
    }

    return errors;
  }

  async function submit(values: Values) {
    const response = await api.get('/students/filter', {
      params: values,
    });

    const csv = createCSV(
      response.data.map((row: Record<string, any>) => ({
        ...row,
        courseClass: row.courseClass.courseClass,
      })),
      [
        'name',
        'matriculation',
        'birthdate',
        'disability',
        'gender',
        'race',
        'city',
        'originSchoolType',
        'entryForm',
        'courseClass',
      ],
    );

    saveAs(
      new Blob([csv], { type: 'text/plain;charset=utf-8' }),
      `alunos-${Date.now()}.csv`,
    );
  }

  const { handleChange, errors, handleSubmit } = useForm<Values>(
    {
      courseClasses: [],
      races: [],
      genders: [],
      cities: [],
      originSchoolTypes: [],
    },
    validate,
    submit,
  );

  function getHandleAutocompleteChange(field: keyof Values) {
    return (event: any, value: any[]) => handleChange(field, value);
  }

  const [courseClasses] = useFetch<CourseClass[]>('course-classes');
  const [races] = useFetch<string[]>('students/races');
  const [genders] = useFetch<string[]>('students/genders');
  const [schoolTypes] = useFetch<string[]>('students/school-types');
  const [cities] = useFetch<string[]>('students/cities');

  return (
    <PageContainer maxWidth="md" isLoading={!(courseClasses && races)}>
      <Typography className={styles.title} variant="h4" component="h1">
        Exportar dados
      </Typography>

      <Grid container spacing={3} className={styles.selects}>
        <Grid item xs={12}>
          <Autocomplete
            options={courseClasses || []}
            multiple
            disabled={!courseClasses}
            limitTags={2}
            getOptionLabel={(courseClass) => courseClass.courseClass}
            groupBy={(courseClass) => courseClass.course.course}
            onChange={(_, value) =>
              handleChange(
                'courseClasses',
                value.map((courseClass) => courseClass.id),
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.courseClasses}
                helperText="Você deve selecionar pelo menos uma turma."
                label="Turmas"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={races || []}
            multiple
            disabled={!races}
            limitTags={3}
            onChange={getHandleAutocompleteChange('races')}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.races}
                helperText="Você deve selecionar pelo menos uma raça/etnia."
                label="Raças/etnias"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={genders || []}
            multiple
            disabled={!genders}
            onChange={getHandleAutocompleteChange('genders')}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.genders}
                helperText="Você deve selecionar pelo menos um sexo."
                label="Sexos"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={schoolTypes || []}
            multiple
            disabled={!schoolTypes}
            onChange={getHandleAutocompleteChange('originSchoolTypes')}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.originSchoolTypes}
                helperText="Você deve selecionar pelo menos um tipo de escola de origem."
                label="Tipos de escola de origem"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={cities || []}
            multiple
            disabled={!cities}
            onChange={getHandleAutocompleteChange('cities')}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errors.cities}
                helperText="Você deve selecionar pelo menos uma cidade."
                label="Cidades"
              />
            )}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disableElevation
      >
        Exportar
      </Button>
    </PageContainer>
  );
}
