import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false
    });

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, open: open });
    };

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <NavigationItem path="/" label='Home' iconType='home' />
            <NavigationItem path="/tracks" label='Tracks' iconType='tracks' />
            <NavigationItem path="/questions" label='Questions' iconType='questions' />
            <NavigationItem path="/results" label='Results' iconType='results' />
            {/* <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                <NavigationItem path="/" label='Home' iconType='home' />
            </List> */}
        </div>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open Left</Button>
            <Drawer open={state.open} onClose={toggleDrawer(false)}>
                {sideList()}
            </Drawer>
        </div>
    );
}