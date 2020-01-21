import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NewQuestionForm from '../../components/NewQuestionForm/NewQuestionForm';
import BrowseQuestions from '../../components/BrowseQuestions/BrowseQuestions';

class Questions extends Component {

    state = {
        added: false
    }

    render() {
        const purchasedRedirect = this.props.added ? <Redirect to="/" /> : null;
        return (
            <div>
                {purchasedRedirect}
                <NewQuestionForm />
                <BrowseQuestions></BrowseQuestions>
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
