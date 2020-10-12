import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      maxWidth: theme.breakpoints.width('lg'),
      width: '100%',
      marginRight: 0,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      alignSelf: 'center',
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Navbar: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();

  function navigateToCourses() {
    history.push('/cursos');
  }

  function navigateToStudents() {
    history.push('/alunos');
  }

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar} variant="dense">
        <Typography variant="h6" className={styles.title}>
          Controle de Alunos
        </Typography>
        <Button color="inherit" onClick={navigateToCourses}>
          Cursos
        </Button>
        <Button color="inherit" onClick={navigateToStudents}>
          Alunos
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
