import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CourseClassPage from './pages/course-class/course-class.page';
import CoursePage from './pages/course/course.page';
import CoursesPage from './pages/courses/courses.page';
import CreateStudentsPage from './pages/create-students/create-students.page';
import ExportDataPage from './pages/export-data/export-data.page';
import StudentsPage from './pages/students/students.page';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/cursos" exact>
          <CoursesPage />
        </Route>
        <Route path="/cursos/:id" exact>
          <CoursePage />
        </Route>
        <Route path="/turmas/:id" exact>
          <CourseClassPage />
        </Route>
        <Route path="/alunos" exact>
          <StudentsPage />
        </Route>
        <Route path="/alunos/adicionar" exact>
          <CreateStudentsPage />
        </Route>
        <Route path="/exportar" exact>
          <ExportDataPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
