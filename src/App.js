import React from 'react';
import logo from './runtimeLogo.PNG';
import './App.css';
import { connect } from 'react-redux';

function App(props) {

  const { text } = props;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          I fetched this --> {text} from the Redux store.
        </p>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    text: state.someTextToRemove
  }
}

export default connect(mapStateToProps)(App);
