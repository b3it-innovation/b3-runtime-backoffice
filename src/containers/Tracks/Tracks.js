import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Tracks.module.css';

import Map from './Map/Map';
import * as actions from '../../store/actions/index';
import CheckpointScroller from './CheckpointScroller/CheckpointScroller';

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkpoints: [],
            category: null,
            name: null,
        };
    }

    handleAddCheckpoint = (checkpoint) => {
        this.setState((prevState) => {
            const newCheckpoints = prevState.checkpoints.concat(checkpoint);
            return ({ checkpoints: newCheckpoints });
        });
    }

    handleDraggedCheckpoint = (order, newLat, newLng) => {
        this.setState((prevState) => {
            console.log('checkpoints before stringify', prevState.checkpoints);

            const newCheckpoints = JSON.parse(JSON.stringify(prevState.checkpoints));
            console.log('checkpoints after stringify', newCheckpoints);

            const newCheckpoint = newCheckpoints[order - 1];
            console.log('new checkpoint', newCheckpoint);
            newCheckpoint.lat = newLat;
            newCheckpoint.lng = newLng;
            return ({ checkpoints: newCheckpoints });
        });
    }

    render() {
        const { checkpoints } = this.state;
        return (
            <div className={classes.topContainer}>
                <Map checkpoints={checkpoints} addCheckpoint={this.handleAddCheckpoint} length={checkpoints.length} drag={this.handleDraggedCheckpoint} />
                <div className={classes.checkpointsContainer}>
                    <CheckpointScroller checkpoints={checkpoints} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
