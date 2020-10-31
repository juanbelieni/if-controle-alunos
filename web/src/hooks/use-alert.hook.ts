import { useContext } from 'react';

import AlertContext from '../contexts/alert.context';

export default function useAlert() {
  const { setOpen, setMessage } = useContext(AlertContext);

  function showAlert(message: string) {
    setOpen(true);
    setMessage(message);
  }

  return showAlert;
}
