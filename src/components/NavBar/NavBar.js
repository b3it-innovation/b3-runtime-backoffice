import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Home, RoomRounded, ContactSupportRounded, FormatListNumberedRounded } from '@material-ui/icons';
import 'typeface-roboto';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';


export const NavBar = () => {
    return (
        <div>
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <Typography variant='h5' color='inherit'>
                        b3runtime
                    </Typography>
                    <List component='nav'>
                        <ListItem component='div'>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6"><Link to="/" className={classes.Link}>Home</Link> <Home /></Typography>
                            </ListItemText>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6"><Link to="/tracks" className={classes.Link}>Tracks</Link> <RoomRounded /></Typography>
                            </ListItemText>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6"><Link to="/questions" className={classes.Link}>Questions</Link> <ContactSupportRounded /></Typography>
                            </ListItemText>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6"><Link to="/results" className={classes.Link}>Results</Link> <FormatListNumberedRounded /></Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;

