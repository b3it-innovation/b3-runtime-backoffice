import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import CenteredTabs from '../../components/Navigation/CenterdTabs/CenteredTabs';
import CreateCompetition from './CreateCompetition/CreateCompetition';
import BrowseCompetitions from './BrowseCompetitions/BrowseCompetitions';

class Competitions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0,
        };
    }

    componentDidMount() {
        const { fetchTracks } = this.props;
        fetchTracks();
    }

    handleChange = (event, newValue) => {
        this.setState({ tabValue: newValue });
    };

    render() {
        const tabs = ['Create Competition', 'Browse Competitions'];
        const { tabValue } = this.state;
        let content = null;
        switch (tabValue) {
            case 0:
                content = <CreateCompetition />;
                break;
            case 1:
                content = <BrowseCompetitions />;
                break;
            default:
                content = null;
        }

        return (
            <div>
                <CenteredTabs tabs={tabs} value={tabValue} change={this.handleChange} />
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    fetchTracks: () => dispatch(actions.fetchTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Competitions);
