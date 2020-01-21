import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CategoryDropDown from '../UI/Dropdown/CategoryDropDown';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/index';
import Panel from '../UI/ExpansionPanel/Panel';



const styles = {
    container: {
        background: 'white',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: '500px',
        padding: '0 30px',
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

    render() {

        const { classes } = this.props;

        let questions = null;
        if (this.props.questions) {
            questions = this.props.questions.map(q => {
                return <Panel key={q.id} label={q.title} object={q} />
            })
        }

        return (
            <div className={classes.container}>
                <CategoryDropDown allCat cat={this.props.cat} value={this.state.category || ''} handleChange={this.handleChange} />
                <TextField className={classes.input} name='searchText' label="Search" variant="filled" value={this.state.searchText || ''} onChange={this.handleChange} />
                <Button size="small" className={classes.optionsButton} onClick={this.handleSearch}>SEARCH</Button>
                {questions}
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
        searchQuestions: (category) => dispatch(actions.searchQuestions(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BrowseQuestions))
