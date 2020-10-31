// import './styles/themes/global.scss';
import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import React from 'react';

import { AlertProvider } from './contexts/alert.context';
import Routes from './routes';

const theme = responsiveFontSizes(createMuiTheme({}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <Routes />
      </AlertProvider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
