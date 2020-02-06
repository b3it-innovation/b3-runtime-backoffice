import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

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

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

const getLabelColor = (order, length) => {
    let labelColor;
    if (order === 1) {
        labelColor = 'green';
    } else if (length === order && length > 3 && order % 2 === 0) {
        labelColor = 'purple';
    } else if (order % 2 === 0) {
        labelColor = 'red';
    } else {
        labelColor = '#EFB612';
    }
    return labelColor;
};

function SingleOpenPanel(props) {
    const {
        label, object, type, onEdit, onDelete, expanded, id,
        handleChange, checkpointsLength, onSelect,
    } = props;

    let styleObject;
    if (type === 'checkpoint') {
        const labelColor = getLabelColor(object.order, checkpointsLength);
        styleObject = { borderLeft: `7px solid ${labelColor}` };
    }

    return (
        <ExpansionPanel expanded={expanded === id} onChange={handleChange(id)} key={id}>
            <ExpansionPanelSummary
                style={styleObject}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <h4>
                    {label}
                    {object.questionTitle ? ', ' : null}
                    {object.questionTitle}
                </h4>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                type={type}
                object={object}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
            />
        </ExpansionPanel>
    );
}

export default SingleOpenPanel;
