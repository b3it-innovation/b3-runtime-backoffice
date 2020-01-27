import React, { Component } from 'react'
import classes from './ImageTransitionOverlay.module.css';

export default class ImageTransitionOverlay extends Component {

    state = {
        visible: false
    }
    
    componentDidMount() {
          this.setState({visible: true})
    }

    render() {
        return (

            <div className={this.state.visible
                ? classes.elementToFadeInAndOut
                : null}>
                    {this.props.children}
            </div>
        )
    }
}
