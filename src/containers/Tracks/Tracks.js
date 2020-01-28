import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from './Map/Map';
import * as actions from '../../store/actions/index';

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkpoints: [],
        };
    }

    handleAddCheckpoint = (checkpoint) => {
        this.setState((prevState) => {
            const newCheckpoints = [...prevState.checkpoints];
            newCheckpoints.push(checkpoint);
            return ({ checkpoints: newCheckpoints });
        });
    }

    handleDraggedCheckpoint = (order, newLat, newLng) => {
        this.setState((prevState) => {
            const newCheckpoints = [...prevState.checkpoints];
            const newCheckpoint = newCheckpoints[order - 1];
            newCheckpoint.lat = newLat;
            newCheckpoint.lng = newLng;
            return ({ checkpoints: newCheckpoints });
        });
    }

    render() {
        const { checkpoints } = this.state;
        return (
            <div>
                <h1>Tracks</h1>
                <Map addCheckpoint={this.handleAddCheckpoint} length={checkpoints.length} drag={this.handleDraggedCheckpoint} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
