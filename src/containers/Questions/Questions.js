import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AddQuestion from './AddQuestion/AddQuestion';
import BrowseQuestions from './BrowseQuestions/BrowseQuestions';
import Button from '@material-ui/core/Button'

class Questions extends Component {

    state = {
        browse: false
    }

    toggleBrowse = () => {
        this.setState((prevState) => ({
            browse: !prevState.browse
        }))
    }

    render() {
        const questionAddedRedirect = this.props.added ? <Redirect to="/" /> : null;
        return (
            <div>
                {questionAddedRedirect}
                <Button variant="contained" color="primary" onClick={this.toggleBrowse}>{this.state.browse ? 'Add question' : 'Browse questions'}</Button>

                {this.state.browse ? <BrowseQuestions /> : <AddQuestion />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        added: state.questions.questionAdded
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
