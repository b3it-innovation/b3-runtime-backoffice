import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import NavigationItems from '../NavigationItems/NavigationItems';


export const NavBar = () => {
    return (
        <div>
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <Typography variant='h5' color='inherit'>
                        b3runtime
                    </Typography>
                    <NavigationItems />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;

