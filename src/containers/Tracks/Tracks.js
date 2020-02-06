import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import classes from './Tracks.module.css';

import Map from './Map/Map';
import * as actions from '../../store/actions/index';
import CheckpointScroller from './CheckpointScroller/CheckpointScroller';
import TrackForm from './TrackForm/TrackForm';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import QuestionScroller from './QuestionScroller/QuestionScroller';
import CheckpointPresenter from './CheckpointPresenter/CheckpointPresenter';
import SaveButton from '../../components/UI/Button/SaveButton/SaveButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

const YELLOW_MARKER = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fbff0f';
const RED_MARKER = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569';
const GREEN_MARKER = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|1dc41d';
const STAR_MARKER = 'https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=star|ff55ff';

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkpoints: [],
            categoryKey: null,
            trackName: null,
            expanded: false,
            editing: false,
            currentCheckpoint: null,
        };
    }

    handleAddCheckpoint = (checkpoint) => {
        this.setState((prevState) => {
            const newCheckpoints = prevState.checkpoints.concat(checkpoint);
            return ({ checkpoints: newCheckpoints, expanded: false });
        });
        this.onOpenPanel();
    }

    clearCheckpoints = () => {
        this.setState({
            checkpoints: [],
        });
    }

    handlePanelChange = (panelId) => (event, newExpanded) => {
        const { editing } = this.state;
        this.setState({
            expanded: newExpanded ? panelId : false,
        });

        if (editing) {
            this.onOpenPanelEdit(panelId);
        } else {
            this.onOpenPanel();
        }
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

    onOpenPanelEdit = (order) => {
        this.setState((prevState) => {
            const newCheckpoints = [...prevState.checkpoints];
            const checkpoint = newCheckpoints[order - 1];
            return ({ currentCheckpoint: checkpoint });
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
        this.moveQuestionsInCheckpoints(newCheckpoints, order);
        this.setState({
            checkpoints: newCheckpoints,
        });
    }

    moveQuestionsInCheckpoints = (checkpoints, order) => {
        if ((order === 1 || order % 2 === 1) && order !== checkpoints.length + 1) {
            for (let i = order - 1; i < checkpoints.length - 1; i += 2) {
                const title = checkpoints[i].questionTitle;
                const key = checkpoints[i].questionKey;
                checkpoints[i + 1].questionTitle = title;
                checkpoints[i + 1].questionKey = key;
                checkpoints[i].questionTitle = null;
                checkpoints[i].questionKey = null;
            }
        } else if (order === (checkpoints.length + 1)) {
            checkpoints[order - 2].questionTitle = null;
            checkpoints[order - 2].questionKey = null;
        } else {
            for (let i = order; i < checkpoints.length - 1; i += 2) {
                const title = checkpoints[i].questionTitle;
                const key = checkpoints[i].questionKey;
                checkpoints[i - 1].questionTitle = title;
                checkpoints[i - 1].questionKey = key;
                checkpoints[i].questionTitle = null;
                checkpoints[i].questionKey = null;
            }
        }
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

    handleContinue = (name, categoryId) => {
        this.setState({
            editing: true,
            trackName: name,
            categoryKey: categoryId,
        });
    }

    handleCheckpointTitleChange = (event) => {
        const { checkpoints, currentCheckpoint } = this.state;
        const checkpoint = { ...currentCheckpoint };
        checkpoint.title = event.target.value;
        const newCheckpoints = [...checkpoints];
        newCheckpoints[checkpoint.order - 1] = checkpoint;
        this.setState({
            checkpoints: newCheckpoints,
            currentCheckpoint: checkpoint,
        });
    }

    convertMarkersToCheckpoints = (markers) => {
        const trackCheckpoints = markers.map((marker) => {
            const checkpoint = {};
            checkpoint.order = marker.order;
            checkpoint.latitude = marker.position.lat();
            checkpoint.longitude = marker.position.lng();
            checkpoint.penalty = marker.penalty;
            checkpoint.questionKey = marker.questionKey ? marker.questionKey : null;
            checkpoint.label = marker.title ? marker.title : null;
            return (checkpoint);
        });
        return trackCheckpoints;
    }

    handleSave = (name, key) => {
        let trackName = name;
        let catKey = key;
        if (!trackName || !catKey) {
            trackName = this.state.trackName;
            catKey = this.state.categoryKey;
        }
        const track = { categoryKey: catKey, name: trackName };

        const trackCheckpoints = this.convertMarkersToCheckpoints(this.state.checkpoints);
        this.props.addTrack(track, trackCheckpoints);
    };


    handleSelect = (questionId, questionTitle) => {
        const { checkpoints, currentCheckpoint } = this.state;
        if (currentCheckpoint) {
            const newCheckpoint = { ...currentCheckpoint };
            newCheckpoint.questionKey = questionId;
            newCheckpoint.questionTitle = questionTitle;
            const newCheckpoints = [...checkpoints];
            newCheckpoints[newCheckpoint.order - 1] = newCheckpoint;
            this.setState({
                checkpoints: newCheckpoints,
                currentCheckpoint: newCheckpoint,
            });
        }
    }

    handleBack = () => {
        this.setState({
            editing: false,
        });
    }

    render() {
        const {
            checkpoints, expanded, editing, currentCheckpoint, trackName, categoryKey,
        } = this.state;
        const { loading } = this.props;

        let spinner = null;
        if (loading) {
            spinner = <Spinner />;
        }
        const modal = <Modal open={loading}>{spinner}</Modal>;

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
                        clearCheckpoints={this.clearCheckpoints}
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
                        categoryKey={categoryKey}
                        trackName={trackName}
                    />
                </div>
                {modal}
            </Aux>
        );

        let editView = null;

        if (editing) {
            editView = (
                <div className={classes.topContainer}>
                    <div className={classes.checkpointsContainer}>
                        <CheckpointScroller
                            checkpoints={checkpoints}
                            expanded={expanded}
                            handleChange={this.handlePanelChange}
                        />
                    </div>
                    <div className={classes.checkpointsContainer}>
                        {currentCheckpoint && expanded
                            ? (
                                <CheckpointPresenter
                                    checkpoint={currentCheckpoint}
                                    onChange={this.handleCheckpointTitleChange}
                                />
                            ) : null}
                        <SaveButton click={this.handleSave}>Save track</SaveButton>
                        <Button
                            className={classes.button}
                            onClick={() => this.handleBack()}
                        >
                            Back to map
                        </Button>
                    </div>
                    <div className={classes.checkpointsContainer}>
                        <QuestionScroller
                            onSelect={this.handleSelect}
                            checkpointExpanded={expanded}
                            currentCheckpoint={currentCheckpoint}
                            checkpointsLength={checkpoints.length}
                        />
                    </div>
                    {modal}
                </div>
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
    loading: state.tracks.loading,
});

const mapDispatchToProps = (dispatch) => ({
    addTrack: (track, trackCheckpoints) => dispatch(actions.addTrack(track, trackCheckpoints)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
