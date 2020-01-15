import React from 'react';
import logo from './runtimeLogo.PNG';
import './App.css';
import { connect } from 'react-redux';
import NavBar from './components/NavBar/NavBar';

function App(props) {

  const { text } = props;

  return (
    <div className="App">
      <NavBar />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    text: state.someTextToRemove
  }
}

export default connect(mapStateToProps)(App);
