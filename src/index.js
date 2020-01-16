import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import 'typeface-roboto';

const store = createStore(rootReducer);

const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: 'rgb(23, 105, 170)',
        dark: '#000'
     },
     secondary: {
       main: '#006A8E',
     },
  },
  typography: { 
    fontFamily: 'typeface-roboto'
  }
});

ReactDOM.render(<Provider store={store}><MuiThemeProvider theme={theme}><App /></MuiThemeProvider></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
