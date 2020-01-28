import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import rootReducer from './store/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import App from './App';
import 'typeface-roboto';


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#fff',
            main: '#3f51b5',
            dark: '#000',
        },
        secondary: {
            main: '#006A8E',
        },
    },
    typography: {
        fontFamily: 'typeface-roboto',
    },
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    compose(
        composeEnhancers(applyMiddleware(thunk)),
    ),
);


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
