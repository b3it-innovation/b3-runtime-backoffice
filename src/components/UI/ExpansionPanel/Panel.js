import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PanelDetail from './PanelDetail/PanelDetail';

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

function Panel(props) {
    const classes = useStyles();

    const {
        label, object, type, onEdit, onDelete,
    } = props;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{label}</Typography>
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

export default Panel;
