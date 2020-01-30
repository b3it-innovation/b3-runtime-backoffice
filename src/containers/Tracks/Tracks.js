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
            expanded: false,
        };
    }

    handleAddCheckpoint = (checkpoint) => {
        this.setState((prevState) => {
            const newCheckpoints = prevState.checkpoints.concat(checkpoint);
            return ({ checkpoints: newCheckpoints, expanded: false });
        });
        this.onOpenPanel();
    }

    handlePanelChange = (panelId) => (event, newExpanded) => {
        this.setState({
            expanded: newExpanded ? panelId : false,
        });
        this.onOpenPanel();
    }

    onOpenPanel = () => {
        this.setState((prevState) => {
            const newCheckpoints = [...prevState.checkpoints];
            newCheckpoints.forEach((checkpoint) => {
                if (checkpoint.order === prevState.expanded) {
                    checkpoint.setAnimation(window.google.maps.Animation.BOUNCE);
                } else {
                    checkpoint.setAnimation(null);
                }
            });
            return ({ checkpoints: newCheckpoints });
        });
    }

    handleDraggedCheckpoint = (order, newLat, newLng) => {
        this.setState((prevState) => {
            // const newCheckpoints = JSON.parse(JSON.stringify(prevState.checkpoints));
            // Titta på om detta är immutable?
            const newCheckpoints = [...prevState.checkpoints];
            const newCheckpoint = newCheckpoints[order - 1];
            const latlng = new window.google.maps.LatLng(newLat, newLng);
            newCheckpoint.setPosition(latlng);
            return ({ checkpoints: newCheckpoints });
        });
    }

    deleteMarker = (order) => {
        this.setState({
            expanded: false,
        });
        let newCheckpoints = [...this.state.checkpoints];
        const delCheckpoint = newCheckpoints.splice(order - 1, 1);
        delCheckpoint[0].setMap(null);
        newCheckpoints = newCheckpoints.map((checkpoint, index) => {
            checkpoint.order = index + 1;
            return checkpoint;
        });
        this.setState({
            checkpoints: newCheckpoints,
        });
    }

    render() {
        const { checkpoints, expanded } = this.state;
        return (
            <div className={classes.topContainer}>
                <Map
                    expanded={expanded}
                    checkpoints={checkpoints}
                    addCheckpoint={this.handleAddCheckpoint}
                    length={checkpoints.length}
                    drag={this.handleDraggedCheckpoint}
                />
                <div className={classes.checkpointsContainer}>
                    <CheckpointScroller
                        checkpoints={checkpoints}
                        expanded={expanded}
                        handleChange={this.handlePanelChange}
                        onDelete={this.deleteMarker}
                    />
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
