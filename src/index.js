import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import storeInstance from './redux/Reducers';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
        contrastText: '#121212'
      }
    },
  });

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <ThemeProvider theme={darkTheme}>
        <App />
        </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
