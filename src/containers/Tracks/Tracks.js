import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Tracks.module.css';

import Map from './Map/Map';
import * as actions from '../../store/actions/index';
import CheckpointScroller from './CheckpointScroller/CheckpointScroller';
import TrackForm from './TrackForm/TrackForm';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import QuestionScroller from './QuestionScroller/QuestionScroller';

const YELLOW_MARKER = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fbff0f';
const RED_MARKER = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569';
const GREEN_MARKER = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|1dc41d';
const STAR_MARKER = 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=star|ff55ff';

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkpoints: [],
            category: null,
            name: null,
            expanded: false,
            editing: false,
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
        const { checkpoints } = this.state;
        this.setState({
            expanded: false,
        });
        let newCheckpoints = [...checkpoints];
        const delCheckpoint = newCheckpoints.splice(order - 1, 1);
        delCheckpoint[0].setMap(null);
        newCheckpoints = newCheckpoints.map((checkpoint, index) => {
            checkpoint.order = index + 1;
            let iconColor = RED_MARKER;
            let pen = false;
            if (checkpoint.order === 1) {
                iconColor = GREEN_MARKER;
            } else if (checkpoint.order % 2 === 1) {
                iconColor = YELLOW_MARKER;
                pen = true;
            } else if (checkpoint.order === newCheckpoints.length
                && checkpoint.order % 2 !== 1 && newCheckpoints.length > 3) {
                iconColor = STAR_MARKER;
            }
            checkpoint.setIcon(iconColor);
            checkpoint.penalty = pen;
            return checkpoint;
        });
        this.setState({
            checkpoints: newCheckpoints,
        });
    }

    updateGoalMarkerIcon = () => {
        const { checkpoints } = this.state;
        const newCheckpoints = [...checkpoints];
        const checkpoint = newCheckpoints[newCheckpoints.length - 2];
        checkpoint.setIcon(RED_MARKER);
        this.setState({
            checkpoints: newCheckpoints,
        });
    }

    handleContinue = () => {
        this.setState({
            editing: true,
        });
    }

    handleSave = (trackName, catKey) => {
        const track = { categoryKey: catKey, name: trackName };

        const trackCheckpoints = this.state.checkpoints.map((marker) => {
            const checkpoint = {};
            checkpoint.order = marker.order;
            checkpoint.latitude = marker.position.lat();
            checkpoint.longitude = marker.position.lng();
            checkpoint.penalty = marker.penalty;
            return (checkpoint);
        });

        this.props.addTrack(track, trackCheckpoints);
    };

    // TODO: add selected question to chosen checkpoint
    handleSelect = (questionId, questionTitle) => {
        console.log(questionId, questionTitle);
    }

    render() {
        const { checkpoints, expanded, editing } = this.state;

        let trackView = null;

        trackView = (
            <Aux>
                <div className={classes.topContainer}>
                    <Map
                        expanded={expanded}
                        checkpoints={checkpoints}
                        addCheckpoint={this.handleAddCheckpoint}
                        length={checkpoints.length}
                        drag={this.handleDraggedCheckpoint}
                        onUpdate={this.updateGoalMarkerIcon}
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
                <div>
                    <TrackForm
                        checkpoints={checkpoints}
                        handleContinue={this.handleContinue}
                        handleSave={this.handleSave}
                    />
                </div>
            </Aux>
        );

        let editView = null;

        if (editing) {
            editView = (
                <Aux>
                    <div className={classes.topContainer}>
                        <div className={classes.checkpointsContainer}>
                            <CheckpointScroller
                                checkpoints={checkpoints}
                                expanded={expanded}
                                handleChange={this.handlePanelChange}
                                onDelete={this.deleteMarker}
                            />
                        </div>
                        <div className={classes.checkpointsContainer}>
                            <h1>Vald checkpoint</h1>
                        </div>
                        <div className={classes.checkpointsContainer}>
                            <QuestionScroller onSelect={this.handleSelect} />
                        </div>
                    </div>
                </Aux>
            );
        }

        return (
            <div>
                {editing ? editView : trackView}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    addTrack: (track, trackCheckpoints) => dispatch(actions.addTrack(track, trackCheckpoints)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
