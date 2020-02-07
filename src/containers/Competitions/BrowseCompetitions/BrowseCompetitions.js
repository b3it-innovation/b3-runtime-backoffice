import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DropDown from '../../../components/UI/Dropdown/DropDown';
import Panel from '../../../components/UI/Panel/Panel';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        flexWrap: 'nowrap',
        padding: '0',
        margin: 'auto',
    },
    card: {
        minWidth: '100%',
        maxWidth: 1075,
        margin: '0',
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
        if (this.state.dropDownValue !== null && this.state.dropDownValue !== '') {
            this.props.fetchCompetitions(this.state.dropDownValue);
        }
    }

    render() {
        const { classes } = this.props;
        const { dropDownValue } = this.state;
        const {
            competitions, compLoading, tracks, onEdit,
        } = this.props;

        let competitionList = null;
        if (competitions && tracks) {
            competitionList = competitions.map((c) => (
                <Panel key={c.id} type="competition" label={c.name} object={c} onDelete="" onEdit={onEdit} />
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
                        <div><Button click={this.handleSearch} type="search" text="Search" /></div>
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
