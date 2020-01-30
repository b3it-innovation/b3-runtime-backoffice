import React from 'react';
import { Typography, Button } from '@material-ui/core';
import SingleOpenPanel from '../../../components/UI/Panel/SingleOpenPanel/SingleOpenPanel';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './CheckpointScroller.module.css';

function CheckpointScroller(props) {
    const { checkpoints } = props;

    let panels = null;
    if (checkpoints) {
        panels = (
            <Aux>
                <Typography variant="h4" gutterBottom>Checkpoints</Typography>
                <div className={classes.checkpoints}>
                    {checkpoints.map((checkpoint) => (
                        <div key={checkpoint.order}>
                            <SingleOpenPanel
                                type="checkpoint"
                                object={checkpoint}
                                label={checkpoint.order}
                                expanded={props.expanded}
                                id={checkpoint.order}
                                handleChange={props.handleChange}
                                onDelete={props.onDelete}
                            />
                        </div>
                    ))}
                    <Button>Save track</Button>
                    <Button>Continue</Button>
                </div>
            </Aux>
        );
    }

    return (
        <div>
            {panels}
        </div>
    );
}

export default CheckpointScroller;
