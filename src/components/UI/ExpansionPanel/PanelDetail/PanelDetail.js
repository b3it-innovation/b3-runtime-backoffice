import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import Aux from '../../../../hoc/Auxiliary/Auxiliary';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerItem: {
        width: '50%',
    },
}));

function PanelDetail(props) {
    const classes = useStyles();

    const {
        categories, object, type, onEdit, onDelete,
    } = props;

    let content = null;
    if (type === 'question') {
        const { id } = object;
        let categoryName = null;
        const matchedCategory = categories.find((cat) => cat.id === object.category);
        if (matchedCategory == null) {
            categoryName = 'No category found';
        } else {
            categoryName = matchedCategory.name;
        }
        content = (
            <Aux>
                <div className={classes.containerItem}>
                    <p>Text:</p>
                    {' '}
                    <p>{object.text}</p>
                    <p>Category:</p>
                    {' '}
                    <p>{categoryName}</p>
                </div>
                <div className={classes.containerItem}>
                Options:
                    {' '}
                    {object.options.map((option) => (
                        <p key={option.option}>
                            {option.option}
                            {' '}
                            {option.text}
                        </p>
                    ))}
                    <p>
                    Correct Answer:&nbsp
                        {object.correctAnswer}
                    </p>
                    <Button variant="contained" color="secondary" onClick={() => onEdit(id)}>Edit Question</Button>
                    <Button variant="contained" color="primary" onClick={() => onDelete(id)}>Delete Question</Button>
                </div>
            </Aux>
        );
    } else if (type === 'competition') {
        const { tracks } = props;
        let matchedTracks = [];
        if (tracks) {
            matchedTracks = object.trackKeys.map((key) => tracks.find((t) => t.id === key));
        }
        content = (
            <Aux>
                <div className={classes.containerItem}>
                    <p>Name:</p>
                    {' '}
                    <p>{object.name}</p>
                    <p>Date:</p>
                    {' '}
                    <p>{object.date}</p>
                    <p>Active:</p>
                    {' '}
                    <p>{object.active.toString()}</p>
                </div>
                <div className={classes.containerItem}>
                Tracks:
                    {' '}
                    {matchedTracks.map((track) => (
                        <p key={track.id}>
                            {track.name}
                        </p>
                    ))}
                    <Button variant="contained" color="primary">Edit</Button>
                </div>
            </Aux>
        );
    }

    return (
        <ExpansionPanelDetails className={classes.container}>
            {content}
            <Typography />
        </ExpansionPanelDetails>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    tracks: state.tracks.tracks,
});

export default connect(mapStateToProps)(PanelDetail);
