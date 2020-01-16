import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import NewQuestionForm from './components/NewQuestionForm/NewQuestionForm';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";


function App(props) {

    const { text } = props;

    return (
        <Router>
            <NavBar />
            <header className="Header">
                <div className="App">
                    <Route path="/" exact render={() => <h1>b3Runtime</h1>} />
                    <Route path="/questions" exact component={NewQuestionForm} />
                    <Route path="/tracks" exact render={() => <h1>Tracks</h1>} />
                    <Route path="/results" exact render={() => <h1>Results</h1>} />
                </div>
            </header>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        text: state.someTextToRemove
    }
}

export default connect(mapStateToProps)(App);
