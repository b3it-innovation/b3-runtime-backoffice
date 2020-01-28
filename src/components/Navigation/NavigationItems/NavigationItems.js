import React from 'react';

import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const useStyles = makeStyles({
    divider: {
        paddingTop: '10px',
    },
});

export default function NavigationItems(props) {
    const classes = useStyles();

    return (
        <Aux>
            <NavigationItem path="/" label="Home" iconType="home" />
            <Divider className={classes.divider} />
            <NavigationItem path="/competitions" label="Competitions" iconType="competitions" />
            <Divider className={classes.divider} />
            <NavigationItem path="/tracks" label="Tracks" iconType="tracks" />
            <Divider className={classes.divider} />
            <NavigationItem path="/questions" label="Questions" iconType="questions" />
            <Divider className={classes.divider} />
            <NavigationItem path="/results" label="Results" iconType="results" />
        </Aux>
    );
}
