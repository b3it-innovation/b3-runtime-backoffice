import React from 'react';

import { List, ListItem } from '@material-ui/core';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <List component='nav'>
        <ListItem component='div'>
            <NavigationItem path="/" label='Home' iconType='home' />
            <NavigationItem path="/tracks" label='Tracks' iconType='tracks' />
            <NavigationItem path="/questions" label='Questions' iconType='questions' />
            <NavigationItem path="/results" label='Results' iconType='results' />
        </ListItem>
    </List>
);

export default navigationItems;