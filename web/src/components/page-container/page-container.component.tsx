import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';

import Navbar from '../navbar/navbar.component';

type Width = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Props {
  maxWidth?: Width;
  isLoading?: boolean;
}

const useStyles = makeStyles((theme) =>
  createStyles<'main', { maxWidth?: Width }>({
    main: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(3),
      maxWidth: (props) => theme.breakpoints.width(props.maxWidth || 'lg'),
      width: '100%',
      margin: '0 auto',
    },
  }),
);

const PageContainer: React.FC<Props> = ({ children, isLoading, maxWidth }) => {
  const styles = useStyles({ maxWidth });

  return (
    <>
      <Navbar />
      {isLoading && <LinearProgress />}
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default PageContainer;
