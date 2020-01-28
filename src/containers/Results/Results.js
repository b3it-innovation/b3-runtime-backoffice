import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {
    TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table,
} from '@material-ui/core';
import DropDown from '../../components/UI/Dropdown/DropDown';
import * as actions from '../../store/actions/index';
import SearchButton from '../../components/UI/Button/SearchButton/SearchButton';
import TransitionModal from '../../components/UI/Modal/Modal';
import ResultDisplay from '../../components/ResultDisplay/ResultDisplay';
import Spinner from '../../components/UI/Spinner/Spinner';

import { millisToMinutesAndSeconds } from '../../utility/Util/Util';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'nowrap',
    },
    card: {
        minWidth: '100%',
        maxWidth: 1075,
        margin: '0',
    },
    input: {
        width: '70%',
        marginTop: 12,
    },
    optionsButton: {
        width: '70%',
        alignSelf: 'center',
        fontSize: 14,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    table: {
        minWidth: 650,
    },
};

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            competition: null,
            track: null,
            tracksFetched: false,
            modalOpen: false,
            chosenResult: null,
        };
    }

    componentDidMount() {
        const { initCompetitions } = this.props;
        initCompetitions();
    }

    componentDidUpdate() {
        const { competition, tracksFetched } = this.state;
        const { competitions, searchTracks } = this.props;
        if (competition && !tracksFetched) {
            const comp = competitions.find((c) => c.id === competition);
            searchTracks(comp.trackKeys);
            this.updateTrackFetched();
        }
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            [e.target.name]: value,
        });
    }

    handleSearch = () => {
        this.props.searchResults(this.state.track);
    }

    showDetails = (id) => {
        const result = this.props.results.find((res) => res.id === id);
        this.setState({
            chosenResult: result,
        });
        this.handleOpen();
    }

    handleOpen = () => {
        this.setState({
            modalOpen: true,
        });
    };

    handleClose = () => {
        this.setState({
            modalOpen: false,
        });
    };

    updateTrackFetched() {
        this.setState({ tracksFetched: true });
    }

    render() {
        const { classes } = this.props;
        const {
            competition, track, chosenResult, modalOpen,
        } = this.state;
        const {
            competitions, tracks, results, compLoading, trackLoading, resultLoading,
        } = this.props;
        let spinner = null;
        if (compLoading || trackLoading || resultLoading) {
            spinner = <Spinner />;
        }

        let dropDown = null;
        if (competitions) {
            dropDown = (
                <DropDown
                    obj={competitions}
                    value={competition || ''}
                    handleChange={this.handleChange}
                    label="Competitions"
                    name="competition"
                    id="competitionId"
                />
            );
        }
        let tracksDropDown = null;
        if (tracks) {
            tracksDropDown = (
                <DropDown
                    obj={tracks}
                    value={track || ''}
                    handleChange={this.handleChange}
                    label="Tracks"
                    name="track"
                    id="trackId"
                />
            );
        }
        let button = null;
        if (track) {
            button = <SearchButton click={this.handleSearch} />;
        }

        let table = null;
        if (results) {
            table = (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell align="right">
                                    Total time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((res) => (
                                <TableRow key={res.id} onClick={() => this.showDetails(res.id)}>
                                    <TableCell component="th" scope="row">
                                        {res.attendee.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {res.totalTime ? millisToMinutesAndSeconds(res.totalTime) : 'Did not finish'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            Results
                        </Typography>
                        {dropDown}
                        {tracksDropDown}
                        {button}
                        <TransitionModal
                            open={modalOpen}
                            handleClose={this.handleClose}
                        >
                            {chosenResult ? <ResultDisplay result={chosenResult} /> : null}
                        </TransitionModal>
                        {table}
                        {spinner}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

Results.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    competitions: state.competitions.competitions,
    tracks: state.tracks.tracks,
    results: state.results.results,
    compLoading: state.competitions.loading,
    trackLoading: state.tracks.loading,
    resultLoading: state.results.loading,
});

const mapDispatchToProps = (dispatch) => ({
    initCompetitions: () => dispatch(actions.fetchCompetitions()),
    searchTracks: (trackKeys) => dispatch(actions.searchTracksByKeys(trackKeys)),
    searchResults: (trackKey) => dispatch(actions.fetchResultsByTrackKey(trackKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Results));
