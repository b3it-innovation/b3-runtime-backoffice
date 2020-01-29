import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';


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
    formRow: {
        padding: '2vh',
        justifyContent: 'center',
    },
};

class CreateCompetition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            active: false,
            date: '',
            tracks: [],
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleAddOption = (e) => {
        e.preventDefault();
    }

    handleChange = (event) => {
        const { value } = event.target;
        console.log(value);
        if (event.target.name === 'active') {
            this.setState((prevState) => ({
                active: !prevState.active,
            }));
        } else {
            this.setState({
                [event.target.name]: value,
            });
        }
    }

    handleDeleteOption = () => {
    }

    render() {
        const { classes } = this.props;
        const { loading } = this.props;
        const { name, active, date } = this.state;
        let form = <Spinner />;
        if (!loading) {
            form = (
                <form autoComplete="off">
                    <TextField className={classes.input} name="name" label="Name" variant="filled" value={name} onChange={this.handleChange} />

                    <FormGroup row className={classes.formRow}>
                        <FormControlLabel
                            control={(
                                <Switch
                                    checked={active}
                                    name="active"
                                    onChange={this.handleChange}
                                    value={active}
                                    color="primary"
                                />
                            )}
                            label="Active"
                        />
                    </FormGroup>
                    {/* <DropDown
                        value={this.state.tracks}
                        handleChange={this.handleChange}
                        obj={this.props.tracks}
                        label="Category"
                        name="category"
                        id="categoryId"
                    /> */}

                </form>
            );
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            Create a new competition
                        </Typography>
                        {form}
                    </CardContent>
                    <CardActions>
                        <Button size="large" onClick={this.handleSubmit}>SAVE COMPETITION</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    competitions: state.competitions.competitions,
    loading: state.competitions.loading,
    err: state.competitions.error,
    tracks: state.tracks.tracks,
});

const mapDispatchToProps = (dispatch) => ({
    addCompetition: (competition) => dispatch(actions.addCompetition(competition)),
    fetchTracks: () => dispatch(actions.fetchTracks()),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCompetition));
