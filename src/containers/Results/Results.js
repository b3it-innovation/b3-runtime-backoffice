import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import DropDown from '../../components/UI/Dropdown/DropDown'
import * as actions from '../../store/actions/index';
import SearchButton from '../../components/UI/Button/SearchButton/SearchButton';

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
};

class Results extends Component {

    state = {
        competition: null,
        track: null,
        tracksFetched: false
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
            console.log(this.props.tracks);
            tracksDropDown = <DropDown obj={this.props.tracks} value={this.state.track || ''} handleChange={this.handleChange}
                label="Tracks" name="track" id="trackId" />
        }
        let button = null;
        if(this.state.track){
            button = <SearchButton click={this.handleSearch}/>
        }

        return (
            <div>
                <h1>Results</h1>
                {dropDown}
                {tracksDropDown}
                {button}
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
