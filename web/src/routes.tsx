import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CoursePage from './pages/course/course.page';
import CoursesPage from './pages/courses/courses.page';
import CreateStudentsPage from './pages/create-students/create-students.page';
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
        <Route path="/alunos" exact>
          <StudentsPage />
        </Route>
        <Route path="/alunos/adicionar" exact>
          <CreateStudentsPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
