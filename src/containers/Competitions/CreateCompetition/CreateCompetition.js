import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';


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
            trackKeys: [],
        };
    }

    componentDidMount() {
        const { competitionId, competitions } = this.props;
        const { name } = this.state;
        if (competitionId !== null && name === '') { // TODO: Find another way to prevent loop
            const editComp = competitions.find((comp) => comp.id === competitionId);
            const deepCopy = JSON.parse(JSON.stringify(editComp));

            this.setState({
                name: deepCopy.name,
                active: deepCopy.active,
                date: deepCopy.date,
                trackKeys: deepCopy.trackKeys,
            });
        }
    }

    handleSubmit = () => {
        this.props.addCompetition({ ...this.state });
        this.resetState();
    }

    handleUpdate = () => {
        this.props.updateCompetition(this.props.competitionId, { ...this.state });
        this.props.handleSetId(null);
        this.resetState();
    }

    handleChange = (event) => {
        const { value } = event.target;
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

    handleTrackCheckToggle = (id) => () => {
        const { trackKeys } = this.state;
        const currentIndex = trackKeys.indexOf(id);
        const newChecked = [...trackKeys];
        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({ trackKeys: newChecked });
    };

    resetState = () => {
        this.setState({
            name: '',
            active: false,
            date: '',
            trackKeys: [],
        });
    }

    render() {
        const { classes } = this.props;
        const {
            loading, tracks, competitionId,
        } = this.props;
        const { name, active, trackKeys } = this.state;

        let trackList = null;
        if (tracks) {
            trackList = (
                <List
                    dense
                    className={classes.root}
                    subheader={(
                        <ListSubheader component="div" id="nested-list-subheader">
                            choose tracks
                        </ListSubheader>
                    )}
                >
                    { tracks.map((track) => (
                        <ListItem
                            key={track.id}
                            button
                            onClick={this.handleTrackCheckToggle(track.id)}
                        >
                            <ListItemText id={track.id} primary={track.name} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge="end"
                                    onChange={this.handleTrackCheckToggle(track.id)}
                                    checked={trackKeys.indexOf(track.id) !== -1}
                                    inputProps={{ 'aria-labelledby': track.id }}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            );
        }

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
                    {trackList}
                </form>
            );
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            {competitionId ? 'Edit competition' : 'Create a new competition' }
                        </Typography>
                        {form}
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        {competitionId
                            ? <Button size="large" click={this.handleUpdate} text="update competition" type="update" />
                            : <Button size="large" click={this.handleSubmit} text="save competition" type="save" />}
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
    updateCompetition: (id, competition) => dispatch(actions.updateCompetition(id, competition)),
    fetchTracks: () => dispatch(actions.fetchTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCompetition));
