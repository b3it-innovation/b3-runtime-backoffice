import React from 'react';
import { Link } from 'react-router-dom';

import { ListItemText, Typography } from '@material-ui/core';
import {
    Home, RoomRounded, ContactSupportRounded, FormatListNumberedRounded, DirectionsRun,
} from '@material-ui/icons';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    const { path, label } = props;

    let icon = null;
    switch (props.iconType) {
        case 'home':
            icon = <Home />;
            break;
        case 'questions':
            icon = <ContactSupportRounded />;
            break;
        case 'competitions':
            icon = <DirectionsRun />;
            break;
        case 'tracks':
            icon = <RoomRounded />;
            break;
        case 'results':
            icon = <FormatListNumberedRounded />;
            break;
        default:
            icon = null;
    }

    return (
        <ListItemText inset>
            <Typography color="inherit" variant="h6">
                <Link to={path} className={classes.Link}>{label}</Link>
                {icon}
            </Typography>
        </ListItemText>
    );
};

export default navigationItem;
