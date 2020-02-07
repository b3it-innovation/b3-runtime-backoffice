import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import * as actions from '../../../store/actions/index';
import DropDown from '../../../components/UI/Dropdown/DropDown';
import Button from '../../../components/UI/Button/Button';
import { checkValidity, updateObject } from '../../../utility/Util/Util';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'nowrap',
        padding: '0',
        margin: '0',
    },
    input: {
        width: '50%',
        marginRight: 5,
        marginTop: 12,
    },
    dropDown: {
        width: '50%',
        margin: 5,
    },
    button: {
        width: '25%',
    },
};

class TrackForm extends Component {
    constructor(props) {
        super(props);

        const { categoryKey, trackName } = this.props;

        this.state = {
            form: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name',
                    },
                    value: trackName || '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
                categoryKey: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name',
                    },
                    value: categoryKey || '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
            },
            formIsValid: false,
        };
    }

    componentDidMount() {
        const { categories, fetchCategories } = this.props;
        if (!categories) {
            fetchCategories();
        }
    }

    handleChange = (e) => {
        const { form } = this.state;
        const updatedFormElement = updateObject(form[e.target.name], {
            value: e.target.value,
            valid: checkValidity(e.target.value, form[e.target.name].validation),
            touched: true,
        });

        const updatedForm = updateObject(form, {
            [e.target.name]: updatedFormElement,
        });

        let formIsValid = true;
        Object.keys(updatedForm).forEach((key) => {
            formIsValid = updatedForm[key].valid && formIsValid;
        });

        this.setState({ form: updatedForm, formIsValid });
    }

    render() {
        const { classes } = this.props;
        const {
            categories, checkpoints, handleContinue, handleSave,
        } = this.props;
        const { form, formIsValid } = this.state;

        return (
            <div className={classes.container}>
                <TextField
                    className={classes.input}
                    name="name"
                    label="Track Name"
                    variant="filled"
                    value={form.name.value}
                    onChange={this.handleChange}
                    error={!form.name.valid && form.name.touched}
                />
                <DropDown
                    obj={categories}
                    value={form.categoryKey.value || ''}
                    handleChange={this.handleChange}
                    label="Category"
                    name="categoryKey"
                    id="categoryId"
                />
                <Button
                    text="Save Track"
                    type="save"
                    disabled={checkpoints.length < 1 || !formIsValid}
                    click={() => handleSave(form.name.value, form.categoryKey.value)}
                />
                <Button
                    className={classes.button}
                    text="continue edit"
                    type="continue"
                    disabled={checkpoints.length < 4
                        || checkpoints.length % 2 === 1 || !formIsValid}
                    click={() => handleContinue(form.name.value, form.categoryKey.value)}
                />
            </div>
        );
    }
}

TrackForm.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    questions: state.questions.fetchedQuestions,
    loading: state.questions.loading,
    err: state.questions.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(actions.fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TrackForm));
