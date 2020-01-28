import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const CenteredTabs = (props) => {
    const classes = useStyles();

    const { value, change, tabs } = props;

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={change}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {tabs.map((tab) => <Tab key={tab} label={tab} />)}
            </Tabs>
        </Paper>
    );
};

export default CenteredTabs;
