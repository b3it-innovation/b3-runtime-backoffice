import React from 'react';
import { Typography } from '@material-ui/core';
import Panel from '../../../components/UI/ExpansionPanel/Panel';
import aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './CheckpointScroller.module.css';

function CheckpointScroller(props) {
    const { checkpoints } = props;

    let panels = null;
    if (checkpoints) {
        panels = (
            <aux>
                <Typography variant="h4" gutterBottom>Checkpoints</Typography>
                <div className={classes.checkpoints}>
                    {checkpoints.map((checkpoint) => (
                        <div>
                            <Panel type="checkpoint" object={checkpoint} label={checkpoint.order} />
                        </div>
                    ))}
                </div>
            </aux>
        );
    }

    return (
        <div>
            {panels}
        </div>
    );
}

export default CheckpointScroller;
