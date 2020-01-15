import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Home, RoomRounded, ContactSupportRounded, FormatListNumberedRounded } from '@material-ui/icons';
import 'typeface-roboto';


export const NavBar = () => {
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h5' color='inherit'>
                        b3runtime
                    </Typography>
                    <List component='nav'>
                        <ListItem component='div'>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">Home <Home /></Typography>
                            </ListItemText>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">Tracks <RoomRounded /></Typography>
                            </ListItemText>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">Questions <ContactSupportRounded /></Typography>
                            </ListItemText>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">Results <FormatListNumberedRounded /></Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;

