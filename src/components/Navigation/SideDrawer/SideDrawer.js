import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import NavigationItems from '../NavigationItems/NavigationItems';

const useStyles = makeStyles({
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: 250,
    },
    divider: {
        paddingTop: '10px',
    },
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => props.close(false)}
            onKeyDown={() => props.close(false)}
        >
            <NavigationItems />
        </div>
    );

    return (
        <div>
            <Drawer open={props.open} onClose={() => props.close(false)}>
                {sideList()}
            </Drawer>
        </div>
    );
}
