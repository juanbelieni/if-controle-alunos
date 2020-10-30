import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';

import PageContainer from '../../components/page-container/page-container.component';
import useFetch from '../../hooks/use-fetch.hook';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    selects: {
      width: '100%',
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

export default function ExportDataPage() {
  const styles = useStyles();

  const [selectedCourseClasses, setSelectedCourseClasses] = useState<number[]>(
    [],
  );
  const [selectedRaces, setSelectedRaces] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSchoolTypes, setSelectedSchoolTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const [courseClasses] = useFetch<CourseClass[]>('course-classes');
  const [races] = useFetch<string[]>('students/races');
  const [genders] = useFetch<string[]>('students/genders');
  const [schoolTypes] = useFetch<string[]>('students/school-types');
  const [cities] = useFetch<string[]>('students/cities');

  function selectCourseClasses(event: any, value: CourseClass[]) {
    setSelectedCourseClasses(value.map((course) => course.id));
  }

  function selectRaces(event: any, value: string[]) {
    setSelectedRaces(value);
  }

  function selectGenders(event: any, value: string[]) {
    setSelectedGenders(value);
  }

  function selectSchoolTypes(event: any, value: string[]) {
    setSelectedSchoolTypes(value);
  }

  function selectCities(event: any, value: string[]) {
    setSelectedCities(value);
  }

  return (
    <PageContainer maxWidth="md" isLoading={!(courseClasses && races)}>
      <Typography className={styles.title} variant="h4" component="h1">
        Exportar dados
      </Typography>

      <form>
        <Grid container spacing={3} className={styles.selects}>
          <Grid item xs={12}>
            <Autocomplete
              options={courseClasses || []}
              multiple
              disabled={!courseClasses}
              limitTags={2}
              getOptionLabel={(courseClass) => courseClass.courseClass}
              groupBy={(courseClass) => courseClass.course.course}
              onChange={selectCourseClasses}
              renderInput={(params) => (
                <TextField {...params} label="Selecione pelo menos uma turma" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={races || []}
              multiple
              disabled={!races}
              limitTags={3}
              onChange={selectRaces}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione pelo menos uma raça/etnia"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={genders || []}
              multiple
              disabled={!genders}
              onChange={selectGenders}
              renderInput={(params) => (
                <TextField {...params} label="Selecione pelo menos um sexo" />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={schoolTypes || []}
              multiple
              disabled={!schoolTypes}
              onChange={selectSchoolTypes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione pelo menos um tipo de escola de origem"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={cities || []}
              multiple
              disabled={!cities}
              onChange={selectCities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selecione pelo menos uma cidade"
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </PageContainer>
  );
}
