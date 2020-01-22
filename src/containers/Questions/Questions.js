import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NewQuestionForm from '../../components/NewQuestionForm/NewQuestionForm';
import BrowseQuestions from '../../components/BrowseQuestions/BrowseQuestions';
import Button from '@material-ui/core/Button'

class Questions extends Component {

    state = {
        added: false,
        browse: false
    }

    toggleBrowse = () => {
        this.setState((prevState) => ({
            browse: !prevState.browse
        }))
    }

    render() {
        const purchasedRedirect = this.props.added ? <Redirect to="/" /> : null;
        return (
            <div>
                {purchasedRedirect}
                <Button variant="contained" color="primary" onClick={this.toggleBrowse}>{this.state.browse ? 'Add question' : 'Browse questions'}</Button>

                {this.state.browse ? <BrowseQuestions /> : <NewQuestionForm />}
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
