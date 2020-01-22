import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CategoryDropDown from '../UI/Dropdown/CategoryDropDown';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/index';
import Panel from '../UI/ExpansionPanel/Panel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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

    handleSearch = (e) => {
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

        return (

            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Browse questions
                    </Typography>
                        <CategoryDropDown allCat cat={this.props.cat} value={this.state.category || ''} handleChange={this.handleChange} />
                        <TextField className={classes.input} name='searchText' label="Search" variant="filled" value={this.state.searchText || ''} onChange={this.handleChange} />
                        <Button size="small" className={classes.optionsButton} onClick={this.handleSearch}>SEARCH</Button>
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
        cat: state.questions.categories,
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
