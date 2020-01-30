import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { FormControlLabel } from '@material-ui/core';
import PanelDetail from '../PanelDetail/PanelDetail';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}));

function SingleOpenPanel(props) {
    const classes = useStyles();

    const {
        label, object, type, onEdit, onDelete, expanded, id, handleChange,
    } = props;

    return (
        <ExpansionPanel expanded={expanded === id} onChange={handleChange(id)} key={id}>
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{label}</Typography>
{/* 
                <FormControlLabel
                    aria-label="icon"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={<DeleteForeverIcon />}
                /> */}
            </ExpansionPanelSummary>
            <PanelDetail
                className={classes.container}
                type={type}
                object={object}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </ExpansionPanel>
    );
}

export default SingleOpenPanel;
