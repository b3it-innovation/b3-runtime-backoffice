import React from 'react';

import TextField from '@material-ui/core/TextField';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './CheckpointPresenter.module.css';


function CheckpointPresenter(props) {
    const { checkpoint, onChange } = props;

    return (
        <Aux>
            <div>
                <h2>Title: </h2>
                <TextField
                    name="title"
                    label="Checkpoint Name"
                    variant="filled"
                    value={checkpoint.title ? checkpoint.title : ''}
                    onChange={onChange}
                />
                <h2>Penalty: </h2>
                <p>{checkpoint.penalty.toString()}</p>
                <h2>Question: </h2>
                <p>{checkpoint.questionTitle}</p>
            </div>
        </Aux>
    );
}

export default CheckpointPresenter;
