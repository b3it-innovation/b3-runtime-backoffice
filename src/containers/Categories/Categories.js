import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
    TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table,
} from '@material-ui/core';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import TransitionModal from '../../components/UI/Modal/Modal';
import ErrorModal from '../../components/UI/Modal/ErrorModal/ErrorModal';
import { checkValidity, updateObject } from '../../utility/Util/Util';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        padding: '0',
        margin: 'auto',
        flexWrap: 'nowrap',
    },
    card: {
        minWidth: '100%',
        maxWidth: 1075,
    },
    cardAction: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        width: '70%',
        marginTop: 12,
    },
};

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name',
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
            },
            editForm: {
                editName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Name',
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                },
            },
            formIsValid: false,
            editFormIsValid: false,
            modalOpen: false,
            errorModalOpen: true,
            editId: null,
            questionCount: {
                chosenCategory: null,
            },
        };
    }

    componentDidMount() {
        const { categories, fetchCategories } = this.props;
        if (!categories) {
            fetchCategories();
        }
    }

    checkSameCategoryNameExists = (name) => {
        const { categories } = this.props;
        const array = categories.filter((cat) => (cat.name === name));
        return array.length > 0;
    }

    handleSubmit = () => {
        const { form } = this.state;
        if (this.checkSameCategoryNameExists(form.name.value)) {
            const errorMessage = 'Same category name already exists.';
            this.props.addCategoryError({ message: errorMessage });
            this.setState({
                errorModalOpen: true,
            });
        } else {
            this.props.addCategory({ name: form.name.value });
            const updatedFormElement = updateObject(form.name, {
                value: '',
                valid: false,
                touched: false,
            });
            const updatedForm = updateObject(form, {
                name: updatedFormElement,
            });
            this.setState({ form: updatedForm });
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

    handleEditFormChange = (e) => {
        const { editForm } = this.state;
        const updatedFormElement = updateObject(editForm[e.target.name], {
            value: e.target.value,
            valid: checkValidity(e.target.value, editForm[e.target.name].validation),
            touched: true,
        });
        const updatedForm = updateObject(editForm, {
            [e.target.name]: updatedFormElement,
        });
        let editFormIsValid = true;
        Object.keys(updatedForm).forEach((key) => {
            editFormIsValid = updatedForm[key].valid && editFormIsValid;
        });
        this.setState({ editForm: updatedForm, editFormIsValid });
    }

    handleDelete = (id) => {
        this.props.deleteCategory(id);
        this.setState({
            errorModalOpen: true,
        });
    }

    handleEdit = (id, name) => {
        const { editForm } = this.state;
        const updatedFormElement = updateObject(editForm.editName, {
            value: name,
        });
        const updatedForm = updateObject(editForm, {
            editName: updatedFormElement,
        });
        this.setState({
            editForm: updatedForm,
            modalOpen: true,
            editId: id,
        });
    }

    handleUpdate = () => {
        this.props.updateCategory(this.state.editId, this.state.editForm.editName.value);
        this.handleClose();
    }

    handleClose = () => {
        const { editForm } = this.state;
        const updatedFormElement = updateObject(editForm.editName, {
            valid: false,
            touched: false,
        });
        const updatedForm = updateObject(editForm, {
            editName: updatedFormElement,
        });
        this.setState({
            editForm: updatedForm,
            modalOpen: false,
        });
    }

    handleErrorModalClose = () => {
        this.setState({
            errorModalOpen: false,
        });
        this.props.resetCategoryError();
    }

    showQuestionCount = (catId) => {
        const { searchQuestionsByCategory } = this.props;
        if (this.state.questionCount.chosenCategory !== catId) {
            searchQuestionsByCategory(catId);
        }

        this.setState({
            questionCount: { chosenCategory: catId },
        });
    }

    render() {
        const { classes } = this.props;
        const { categories, loading, err } = this.props;
        const {
            form, editForm, formIsValid, editFormIsValid, modalOpen, errorModalOpen, editId,
        } = this.state;

        const modal = (
            <TransitionModal
                open={modalOpen}
                handleClose={this.handleClose}
            >
                <div className={classes.container}>
                    <TextField
                        className={classes.input}
                        id={editId}
                        error={!editForm.editName.valid && editForm.editName.touched}
                        name="editName"
                        label="name"
                        type="text"
                        variant="filled"
                        value={editForm.editName.value}
                        onChange={this.handleEditFormChange}
                        helperText={!editForm.editName.valid && editForm.editName.touched ? 'Required' : null}
                    />
                    <div>
                        <Button click={() => this.handleUpdate()} disabled={!editFormIsValid} type="update" text="UPDATE" />
                    </div>
                </div>
            </TransitionModal>
        );

        let errorModal = null;
        if (err) {
            errorModal = (
                <ErrorModal
                    open={errorModalOpen}
                    handleClose={this.handleErrorModalClose}
                >
                    <div className={classes.container}>
                        <p style={{ color: 'red' }}>{err.message}</p>
                    </div>
                </ErrorModal>
            );
        }

        let formContent = <Spinner />;
        if (!loading) {
            formContent = (
                <form autoComplete="off">
                    <TextField
                        className={classes.input}
                        error={!form.name.valid && form.name.touched}
                        name="name"
                        label={form.name.elementConfig.placeholder}
                        type={form.name.elementConfig.type}
                        variant="filled"
                        value={form.name.value}
                        onChange={this.handleChange}
                        helperText={!form.name.valid && form.name.touched ? 'Required' : null}
                    />
                </form>
            );
        }

        let table = null;
        if (categories) {
            const { questionCount } = this.state;
            const { fetchedQuestions } = this.props;
            table = (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell component="th" scope="row">
                                        {cat.name}
                                        <Typography variant="subtitle2">{questionCount.chosenCategory === cat.id ? `Number of questions: ${fetchedQuestions.length}` : null}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button click={() => this.showQuestionCount(cat.id)} text="Show number of questions" type="search" />
                                        <Button
                                            click={() => this.handleEdit(cat.id, cat.name)}
                                            index={cat.id}
                                            type="edit"
                                            text="edit"
                                        />
                                        <Button click={this.handleDelete} index={cat.id} type="delete" text="delete" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            Add a new category
                        </Typography>
                        {formContent}
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button
                            click={this.handleSubmit}
                            size="large"
                            text="ADD CATEGORY"
                            type="add"
                            disabled={!formIsValid || form.name.value === ''}
                        />
                    </CardActions>
                </Card>
                {errorModal}
                {modal}
                {table}
            </div>
        );
    }
}

Categories.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    err: state.categories.error,
    fetchedQuestions: state.questions.fetchedQuestions,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(actions.fetchCategories()),
    addCategory: (category) => dispatch(actions.addCategory(category)),
    addCategoryError: (error) => dispatch(actions.addCategoryError(error)),
    deleteCategory: (id) => dispatch(actions.deleteCategory(id)),
    updateCategory: (id, newName) => dispatch(actions.updateCategory(id, newName)),
    resetCategoryError: () => dispatch(actions.resetCategoryError()),
    searchQuestionsByCategory: (categoryId) => dispatch(actions.searchQuestions(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Categories));
