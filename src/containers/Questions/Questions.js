import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddQuestion from './AddQuestion/AddQuestion';
import BrowseQuestions from './BrowseQuestions/BrowseQuestions';
import * as actions from '../../store/actions/index';
import CenteredTabs from '../../components/Navigation/CenterdTabs/CenteredTabs';

class Questions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
            editQuestionKey: null,
        };
    }

    componentDidMount() {
        const { categories, fetchCategories } = this.props;
        if (!categories) {
            fetchCategories();
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ tabValue: newValue });
    };

    handleEditQuestion = (questionKey) => {
        this.setState({
            editQuestionKey: questionKey,
            tabValue: 0,
        });
    }

    render() {
        const tabs = ['Add Question', 'Browse Questions'];
        const { tabValue } = this.state;
        const { editQuestionKey } = this.state;
        let content = null;
        switch (tabValue) {
            case 0:
                content = (
                    <AddQuestion
                        questionKey={editQuestionKey}
                        resetKey={this.handleEditQuestion}
                    />
                );
                break;
            case 1:
                content = <BrowseQuestions editQuestion={this.handleEditQuestion} />;
                break;
            default:
                content = null;
        }

        return (
            <div>
                <CenteredTabs tabs={tabs} value={tabValue} change={this.handleChange} />
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    added: state.questions.questionAdded,
    categories: state.categories.categories,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(actions.fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
