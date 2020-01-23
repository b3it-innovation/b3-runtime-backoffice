import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DropDown from '../../../components/UI/Dropdown/DropDown';
import Panel from '../../../components/UI/ExpansionPanel/Panel';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import SearchButton from '../../../components/UI/Button/SearchButton/SearchButton';


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'nowrap',
    },
    card: {
        minWidth: '100%',
        maxWidth: 1075,
        margin: '50px'
    },
    input: {
        width: '70%',
        marginTop: 12
    },
    optionsButton: {
        width: '70%',
        alignSelf: 'center',
        fontSize: 14,
        marginBottom: 8
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24
    },
};

class BrowseQuestions extends Component {

    state = {
        category: null,
        error: null,
        searchText: null,
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleSearch = () => {
        this.props.searchQuestions(this.state.category);
    }

    handleDeleteQuestion = (id) => {
        this.props.deleteQuestion(id)
    }

    render() {
        const { classes } = this.props;

        let questions = null;
        if (this.props.questions) {
            questions = this.props.questions.map(q => {
                return <Panel key={q.id} label={q.title} object={q} onDelete={this.handleDeleteQuestion} />
            })
        }
        let spinner = null;
        if (this.props.loading) {
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
                            all obj={this.props.categories} value={this.state.category || ''} handleChange={this.handleChange}
                            label="Category" name="category" id="categoryId" />
                        <TextField className={classes.input} name='searchText' label="Search" variant="filled" value={this.state.searchText || ''} onChange={this.handleChange} />
                        <SearchButton click={this.handleSearch} />
                        {spinner}
                        {questions}
                    </CardContent>
                </Card>
            </div>
        )
    }
}

BrowseQuestions.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        questions: state.questions.fetchedQuestions,
        loading: state.questions.loading,
        err: state.questions.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchQuestions: (category) => dispatch(actions.searchQuestions(category)),
        deleteQuestion: (id) => dispatch(actions.deleteQuestion(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BrowseQuestions))
