import List from '@material-ui/core/List';
import React from 'react';
import { useParams } from 'react-router-dom';

import DataCard from '../../components/data-card/data-card.component';
import PageContainer from '../../components/page-container/page-container.component';
import Table from '../../components/table/table.component';
import useFetch from '../../hooks/use-fetch.hook';

interface Course {
  name: string;
  formation: string;
}

interface CourseClass {
  id: number;
  entryYear: number;
  entrySemester: number;
}

const CoursePage: React.FC = () => {
  const { id } = useParams();

  const [course, isCourseRevalidating] = useFetch<Course>(`courses/${id}`);

  const [
    courseClasses,
    isCourseClassesRevalidating,
    revalidateCourseClasses,
  ] = useFetch<CourseClass[]>(`course-classes?courseId=${id}`);

  async function createCourseClass() {
    console.log('TODO createCourseClass');
  }

  return (
    <PageContainer isLoading={isCourseRevalidating}>
      <List>
        <DataCard title="Nome" description={course?.name} icon="local_offer" />
        <DataCard
          title="Formação"
          description={course?.formation}
          icon="school"
        />
      </List>
      <br />
      <Table<CourseClass>
        title="Turmas"
        data={courseClasses || []}
        isLoading={isCourseClassesRevalidating}
        onRefrechClick={revalidateCourseClasses}
        editable={{
          onRowAdd: createCourseClass,
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
          },
        ]}
      />
    </PageContainer>
  );
};

export default CoursePage;
