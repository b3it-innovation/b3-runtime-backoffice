import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import NavBar from '../../components/Navigation/NavBar/NavBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    toggleDrawer = (open) => {
        this.setState(({ open }));
    }

    render() {
        const { open } = this.state;
        const { children } = this.props;
        return (
            <Aux>
                <NavBar click={this.toggleDrawer} />
                <SideDrawer close={this.toggleDrawer} open={open} />
                <main className={classes.Content}>
                    {children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
