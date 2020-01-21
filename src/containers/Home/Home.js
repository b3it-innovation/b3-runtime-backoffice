import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Home extends Component {

    state = {
        added: false
    }

    componentDidMount(){
        this.props.initAddQuesion();
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initAddQuesion: () => dispatch(actions.addQuestionInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
