import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { FormControlLabel } from '@material-ui/core';
import MuiExpansionPanelDetails from '../PanelDetail/PanelDetail';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

function SingleOpenPanel(props) {

    const {
        label, object, type, onEdit, onDelete, expanded, id, handleChange,
    } = props;

    return (
        <ExpansionPanel expanded={expanded === id} onChange={handleChange(id)} key={id}>
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{label}</Typography>
                {/* 
                <FormControlLabel
                    aria-label="icon"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={<DeleteForeverIcon />}
                /> */}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                type={type}
                object={object}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </ExpansionPanel>
    );
}

export default SingleOpenPanel;
