import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DropDown from '../../../components/UI/Dropdown/DropDown';
import Panel from '../../../components/UI/Panel/Panel';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import SearchButton from '../../../components/UI/Button/SearchButton/SearchButton';


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        flexWrap: 'nowrap',
        padding: '0',
        margin: 'auto',
    },
    card: {
        minWidth: '100%',
        maxWidth: 1075,
        margin: '0',
    },
    input: {
        width: '70%',
        marginTop: 12,
    },
    optionsButton: {
        width: '70%',
        alignSelf: 'center',
        fontSize: 14,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
};

class BrowseQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: null,
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            [e.target.name]: value,
        });
    }

    handleSearch = () => {
        if (this.state.category !== null && this.state.category !== '') {
            this.props.searchQuestions(this.state.category);
        }
    }

    handleDeleteQuestion = (id) => {
        this.props.deleteQuestion(id);
    }

    render() {
        const { classes } = this.props;
        const { category } = this.state;
        const {
            categories, questions, loading, editQuestion,
        } = this.props;

        let questionList = null;
        if (questions) {
            console.log(questions);
            questionList = questions.map((q) => (
                <Panel
                    key={q.id}
                    type="question"
                    label={q.title}
                    object={q}
                    onDelete={this.handleDeleteQuestion}
                    onEdit={editQuestion}
                />

            ));
        }
        let spinner = null;
        if (loading) {
            spinner = <Spinner />;
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            Browse questions
                        </Typography>
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
                        {spinner}
                        {questionList}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

BrowseQuestions.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    questions: state.questions.fetchedQuestions,
    loading: state.questions.loading,
    err: state.questions.error,
});

const mapDispatchToProps = (dispatch) => ({
    searchQuestions: (category) => dispatch(actions.searchQuestions(category)),
    deleteQuestion: (id) => dispatch(actions.deleteQuestion(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BrowseQuestions));
