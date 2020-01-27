import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import DropDown from '../../components/UI/Dropdown/DropDown'
import * as actions from '../../store/actions/index';
import SearchButton from '../../components/UI/Button/SearchButton/SearchButton';
import { TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table } from '@material-ui/core';
import TransitionModal from '../../components/UI/Modal/Modal';
import ResultDisplay from '../../components/ResultDisplay/ResultDisplay';

import { millisToMinutesAndSeconds } from '../../Util/Util';

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
        margin: '50px'
    },
    input: {
        width: '70%',
        marginTop: 12
    },
    optionsButton: {
        width: '70%',
        alignSelf: 'center',
        fontSize: 14,
        marginBottom: 8
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24
    },
    table: {
        minWidth: 650
    }
};

class Results extends Component {

    state = {
        competition: null,
        track: null,
        tracksFetched: false,
        modalOpen: false,
        chosenResult: null,
    }

    componentDidMount() {
        this.props.initCompetitions();
    }

    componentDidUpdate() {
        if (this.state.competition && !this.state.tracksFetched) {
            let comp = this.props.competitions.find(c => c.id === this.state.competition);
            console.log(comp);
            this.props.searchTracks(comp.trackKeys);
            this.setState({ tracksFetched: true });
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    handleSearch = () => {
        this.props.searchResults(this.state.track);
    }

    showDetails = (id) => {
        let result = this.props.results.find(res => {
            return res.id === id
        })
        this.setState({
            chosenResult: result
        })
        console.log(this.state.chosenResult)
        this.handleOpen();
    }

    handleOpen = () => {
        this.setState({
            modalOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    };


    render() {

        const { classes } = this.props;

        let dropDown = null;
        if (this.props.competitions) {
            dropDown = <DropDown
                obj={this.props.competitions} value={this.state.competition || ''} handleChange={this.handleChange}
                label="Competitions" name="competition" id="competitionId" />
        }
        let tracksDropDown = null;
        if (this.props.tracks) {
            tracksDropDown = <DropDown obj={this.props.tracks} value={this.state.track || ''} handleChange={this.handleChange}
                label="Tracks" name="track" id="trackId" />
        }
        let button = null;
        if (this.state.track) {
            button = <SearchButton click={this.handleSearch} />
        }

        let table = null;
        if (this.props.results) {
            table = (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell align='right'>
                                    Total time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.props.results.map(res => (
                            <TableRow key={res.id} onClick={() => this.showDetails(res.id)}>
                                <TableCell component='th' scope='row'>
                                    {res.attendee.name}
                                </TableCell>
                                <TableCell align='right'>
                                    {res.totalTime ? millisToMinutesAndSeconds(res.totalTime) : 'Did not finish'}
                                </TableCell>
                            </TableRow>
                        ))}</TableBody>
                    </Table>
                </TableContainer>
            );
        }

        return (
            <div>
                <h1>Results</h1>
                {dropDown}
                {tracksDropDown}
                {button}
                <TransitionModal open={this.state.modalOpen} handleClose={this.handleClose}>{this.state.chosenResult ? <ResultDisplay result={this.state.chosenResult} /> : null}</TransitionModal>
                {table}
            </div>
        );
    }
}

Results.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        competitions: state.competitions.competitions,
        tracks: state.tracks.tracks,
        results: state.results.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initCompetitions: () => dispatch(actions.fetchCompetitions()),
        searchTracks: (trackKeys) => dispatch(actions.searchTracksByKeys(trackKeys)),
        searchResults: (trackKey) => dispatch(actions.fetchResultsByTrackKey(trackKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Results));
