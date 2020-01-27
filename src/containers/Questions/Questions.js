import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddQuestion from './AddQuestion/AddQuestion';
import BrowseQuestions from './BrowseQuestions/BrowseQuestions';
import * as actions from '../../store/actions/index';
import CenteredTabs from '../../components/Navigation/CenterdTabs/CenteredTabs';
import Categories from './Categories/Categories';

class Questions extends Component {

    state = {
        tabValue: 0,
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleChange = (event, newValue) => {
        this.setState({ tabValue: newValue });
    };

    render() {
        const tabs = ["Add Question", "Browse Questions", "Add Category"];

        let content = null;
        switch (this.state.tabValue) {
            case 0:
                content = <AddQuestion />;
                break;
            case 1:
                content = <BrowseQuestions />;
                break;
            case 2:
                content = <Categories />;
                break;
            default:
                content = null
        }

        return (
            <div>
                <CenteredTabs tabs={tabs} value={this.state.tabValue} change={this.handleChange} />
                {content}
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
        fetchCategories: () => dispatch(actions.fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
