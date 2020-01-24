import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Menu } from '@material-ui/icons';
import { Button, List, ListItem } from '@material-ui/core';
import 'typeface-roboto';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './NavBar.module.css';

const NavBar = (props) => {
    return (
        <div>
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <Button onClick={() => props.click(true)}><Menu></Menu></Button>
                    <Typography variant='h5' color='inherit'>
                        b3runtime
                    </Typography>
                    <List component='nav' className={classes.DesktopOnly}>
                        <ListItem component='div'>
                            <NavigationItems />
                        </ListItem>
                    </List>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;

