import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { ListItemText } from '@material-ui/core';
import { Home, RoomRounded, ContactSupportRounded, FormatListNumberedRounded } from '@material-ui/icons';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    let icon = null;
    switch (props.iconType) {
        case 'home':
            icon = <Home />;
            break;
        case 'questions':
            icon = <ContactSupportRounded />;
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
                <Link to={props.path} className={classes.Link}>{props.label}</Link>
                {icon}
            </Typography>
        </ListItemText>
    );
};

export default navigationItem;