import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        open: false
    }

    toggleDrawer = (open) => {
        this.setState(({ open: open }))
    }

    render() {
        return (
            <Aux>
                <NavBar click={this.toggleDrawer} />
                <SideDrawer close={this.toggleDrawer} open={this.state.open} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;