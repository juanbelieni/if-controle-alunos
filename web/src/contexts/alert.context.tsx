import Snackbar from '@material-ui/core/Snackbar';
import React, {
  createContext,
  useState,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react';

interface Alert {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertContext = createContext({} as Alert);

export const AlertProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  function handleClose(event: SyntheticEvent | MouseEvent, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <AlertContext.Provider value={{ message, setMessage, open, setOpen }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
    </AlertContext.Provider>
  );
};

export default AlertContext;
