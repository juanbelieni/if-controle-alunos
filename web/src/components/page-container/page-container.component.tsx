import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';

import Navbar from '../navbar/navbar.component';

interface Props {
  isLoading?: boolean;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(3),
      maxWidth: theme.breakpoints.width('lg'),
      width: '100%',
      margin: '0 auto',
    },
  }),
);

const PageContainer: React.FC<Props> = ({ children, isLoading }) => {
  const styles = useStyles();

  return (
    <>
      <Navbar />
      {isLoading && <LinearProgress />}
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default PageContainer;
