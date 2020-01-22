import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const useStyles = makeStyles({
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: 250,
    },
    divider: {
        paddingTop: '10px'
    }
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
            <NavigationItem path="/" label='Home' iconType='home' />
            <Divider className={classes.divider} />
            <NavigationItem path="/tracks" label='Tracks' iconType='tracks' />
            <Divider className={classes.divider} />
            <NavigationItem path="/questions" label='Questions' iconType='questions' />
            <Divider className={classes.divider} />
            <NavigationItem path="/results" label='Results' iconType='results' />
            <Divider className={classes.divider} />

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