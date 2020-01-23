import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Results extends Component {

    state = {
        fetched: false
    }

    componentDidMount() {
        this.props.searchResults("lwtjvmMDPP0v4djxYHuA");
    }


    searchTracksByKeys = () => {
        this.props.searchTracks(this.props.competitions[0].trackKeys);
    }

    render() {
        if (this.props.competitions && !this.state.fetched) {
            this.searchTracksByKeys();
        }

        return (
            <div>
                <h1>Results</h1>
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Results);
