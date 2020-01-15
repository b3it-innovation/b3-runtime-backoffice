import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import NewQuestionForm from './components/NewQuestionForm/NewQuestionForm';


function App(props) {

    const { text } = props;

    return (
        <div className="App">
            <NavBar />
            <NewQuestionForm />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        text: state.someTextToRemove
    }
}

export default connect(mapStateToProps)(App);
