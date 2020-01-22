import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Menu } from '@material-ui/icons';
import Button from '@material-ui/core/Button';


const NavBar = (props) => {
    return (
        <div>
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <Button onClick={() => props.click(true)}><Menu></Menu></Button>
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

