import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
    TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table,
} from '@material-ui/core';

import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import DeleteButton from '../../../components/UI/Button/DeleteButton/DeleteButton';
import { checkValidity, updateObject } from '../../../utility/Util/Util';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '0',
        margin: '0',
        flexWrap: 'nowrap',
    },
    card: {
        minWidth: '100%',
        maxWidth: 1075,
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
            formIsValid: false,
        };
    }

    handleSubmit = (e) => {
        const { form } = this.state;
        e.preventDefault();
        this.props.addCategory({ name: this.state.form.name.value });
        const updatedFormElement = updateObject(this.state.form.name, {
            value: '',
            valid: false,
            touched: false,
        });
        const updatedForm = updateObject(form, {
            name: updatedFormElement,
        });

        this.setState({ form: updatedForm });
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

    handleDelete = (id) => {
        this.props.deleteCategory(id);
    }

    render() {
        const { classes } = this.props;
        const { categories, loading } = this.props;
        const { form, formIsValid } = this.state;

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
                                    </TableCell>
                                    <TableCell align="right">
                                        <DeleteButton click={this.handleDelete} index={cat.id} />
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
                    <CardActions>
                        <Button size="large" onClick={this.handleSubmit} disabled={!formIsValid}>ADD CATEGORY</Button>
                    </CardActions>
                </Card>
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
});

const mapDispatchToProps = (dispatch) => ({
    addCategory: (category) => dispatch(actions.addCategory(category)),
    deleteCategory: (id) => dispatch(actions.deleteCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Categories));
