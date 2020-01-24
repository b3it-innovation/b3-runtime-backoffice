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
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table } from '@material-ui/core';

import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import DeleteButton from '../../../components/UI/Button/DeleteButton/DeleteButton';

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
        marginBottom: 24
    },
    input: {
        width: '70%',
        marginTop: 12

    },
};

class Categories extends Component {

    state = {
        name: '',
        category: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCategory({ name: this.state.name });
        this.setState({name:''});
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({[e.target.name]: value});
    }

    handleDelete = (id) => {
        console.log(id);
        this.props.deleteCategory(id);
    }

    render() {
        const { classes } = this.props;

        let form = <Spinner />;
        if (!this.props.loading) {
            form = (
                <form autoComplete="off">
                    <TextField className={classes.input} name='name' label="Name" variant="filled" value={this.state.name} onChange={this.handleChange} />
                </form>
            );
        }

        let table = null;
        if (this.props.categories) {
            table = (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell align='right'>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.props.categories.map(cat => (
                            <TableRow key={cat.id}>
                                <TableCell component='th' scope='row'>
                                    {cat.name}
                                </TableCell>
                                <TableCell align='right'>
                                    <DeleteButton click={this.handleDelete} index={cat.id}/>
                                </TableCell>
                            </TableRow>
                        ))}</TableBody>
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
                        {form}
                    </CardContent>
                    <CardActions>
                        <Button size="large" onClick={this.handleSubmit}>ADD CATEGORY</Button>
                    </CardActions>
                </Card>
                {table}
            </div>
        );
    }
}

Categories.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        loading: state.categories.loading,
        err: state.categories.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (category) => dispatch(actions.addCategory(category)),
        deleteCategory: (id) => dispatch(actions.deleteCategory(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Categories));