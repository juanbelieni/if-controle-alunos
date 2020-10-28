import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, {
  useState,
  InputHTMLAttributes,
  useRef,
  ChangeEvent,
} from 'react';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange(file: File | undefined): void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    filename: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    placeholder: {
      color: '#555',
    },
    hiddenInput: {
      opacity: 0,
      position: 'absolute',
      width: 1,
      height: 1,
    },
  }),
);

const FileInput: React.FC<Props> = ({ onChange, className, ...attrs }) => {
  const styles = useStyles();
  const [filename, setFilename] = useState<string>();
  const hiddenInput = useRef<HTMLInputElement>(null);

  function clickHiddenInput() {
    hiddenInput?.current?.click();
  }
  const changeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFilename(file?.name);
      onChange(file);
    }
  };

  return (
    <Paper className={`${styles.container} ${className}`} variant="outlined">
      <input
        {...attrs}
        className={styles.hiddenInput}
        type="file"
        ref={hiddenInput}
        onChange={changeFile}
      />
      {filename ? (
        <p className={styles.filename}>{filename}</p>
      ) : (
        <p className={styles.placeholder}>Selecione um arquivo...</p>
      )}
      <IconButton onClick={clickHiddenInput}>
        <Icon>backup</Icon>
      </IconButton>
    </Paper>
  );
};

export default FileInput;
