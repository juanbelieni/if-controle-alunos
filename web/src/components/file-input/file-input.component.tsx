import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    placeholder: {
      color: '#555',
    },
  }),
);

const FileInput: React.FC = () => {
  const styles = useStyles();
  return (
    <Paper className={styles.container} variant="outlined">
      <p className={styles.placeholder}>Selecione um arquivo...</p>
      <IconButton>
        <Icon>backup</Icon>
      </IconButton>
    </Paper>
  );
};

export default FileInput;
