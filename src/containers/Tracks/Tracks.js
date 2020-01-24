import React, { Component } from 'react';
import { connect } from 'react-redux';

import Map from './Map/Map';
import * as actions from '../../store/actions/index';

class Tracks extends Component {

    state = {
        checkpoints: [],
        category: null,
        name: null,
    }

    handleAddCheckpoint = (checkpoint) => {
        let checkpoints = [...this.state.checkpoints];
        checkpoints.push(checkpoint);
        this.setState({
            checkpoints: checkpoints
        })
    }

    handleDraggedCheckpoint = (order, newLat, newLng) => {
        let checkpoints = [...this.state.checkpoints];
        let newCheckpoint = checkpoints[order-1];
        newCheckpoint.lat = newLat;
        newCheckpoint.lng = newLng;

        this.setState({
            checkpoints: checkpoints
        })
    }

    render() {
        return (
            <div>
                <h1>Tracks</h1>
                <Map addCheckpoint={this.handleAddCheckpoint} length={this.state.checkpoints.length} drag={this.handleDraggedCheckpoint}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
