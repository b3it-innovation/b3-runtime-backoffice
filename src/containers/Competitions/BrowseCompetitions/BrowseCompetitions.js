import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DropDown from '../../../components/UI/Dropdown/DropDown';
import Panel from '../../../components/UI/ExpansionPanel/Panel';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import SearchButton from '../../../components/UI/Button/SearchButton/SearchButton';


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'nowrap',
        padding: '0',
        margin: '0',
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
};

const dropDownValues = [{ id: 'active', name: 'Active' }, { id: 'inactive', name: 'Inactive' }];

class BrowseCompetitions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownValue: null,
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({
            [e.target.name]: value,
        });
    }

    handleSearch = () => {
        this.props.fetchCompetitions(this.state.dropDownValue);
    }

    render() {
        const { classes } = this.props;
        const { dropDownValue } = this.state;
        const {
            competitions, compLoading, tracks,
        } = this.props;

        let competitionList = null;
        if (competitions && tracks) {
            competitionList = competitions.map((c) => (
                <Panel key={c.id} type="competition" label={c.name} object={c} onDelete="" />
            ));
        }
        let spinner = null;
        if (compLoading) {
            spinner = <Spinner />;
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            Browse competitions
                        </Typography>
                        <DropDown
                            all
                            obj={dropDownValues}
                            value={dropDownValue || ''}
                            handleChange={this.handleChange}
                            label="Select"
                            name="dropDownValue"
                            id="id"
                        />
                        <SearchButton click={this.handleSearch} />
                        {spinner}
                        {competitionList}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

BrowseCompetitions.propTypes = {
    classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
    competitions: state.competitions.competitions,
    compLoading: state.competitions.loading,
    tracks: state.tracks.tracks,
    err: state.competitions.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCompetitions: (active) => dispatch(actions.fetchCompetitionsByActive(active)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BrowseCompetitions));
