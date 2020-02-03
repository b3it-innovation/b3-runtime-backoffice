import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import SingleOpenPanel from '../../../components/UI/Panel/SingleOpenPanel/SingleOpenPanel';
import DropDown from '../../../components/UI/Dropdown/DropDown';
import SearchButton from '../../../components/UI/Button/SearchButton/SearchButton';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../../store/actions/index';

class QuestionScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: null,
            expanded: false,
        };
    }

    componentDidMount() {
        const { categories, fetchCategories } = this.props;
        if (!categories) {
            fetchCategories();
        }
    }

    handleSearch = () => {
        if (this.state.category !== null && this.state.category !== '') {
            this.props.searchQuestions(this.state.category);
        }
    }

    handlePanelChange = (panelId) => (event, newExpanded) => {
        this.setState({
            expanded: newExpanded ? panelId : false,
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        const { category, expanded } = this.state;
        const { categories, questions, onSelect } = this.props;
        let panels = null;
        if (questions) {
            panels = questions.map((q) => (
                <SingleOpenPanel
                    key={q.id}
                    id={q.id}
                    type="question"
                    label={q.title}
                    object={q}
                    expanded={expanded}
                    handleChange={this.handlePanelChange}
                    onSelect={onSelect}
                />

            ));
        }

        return (
            <Aux>
                <Typography variant="h4" gutterBottom>Questions</Typography>
                <DropDown
                    all
                    obj={categories}
                    value={category || ''}
                    handleChange={this.handleChange}
                    label="Category"
                    name="category"
                    id="categoryId"
                />
                <div><SearchButton click={this.handleSearch} /></div>
                {panels}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    questions: state.questions.fetchedQuestions,
    loading: state.questions.loading,
    err: state.questions.error,
});

const mapDispatchToProps = (dispatch) => ({
    searchQuestions: (category) => dispatch(actions.searchQuestions(category)),
    fetchCategories: () => dispatch(actions.fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScroller);
