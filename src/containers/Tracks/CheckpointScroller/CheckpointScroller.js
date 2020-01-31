import React from 'react';
import { Typography } from '@material-ui/core';
import SingleOpenPanel from '../../../components/UI/Panel/SingleOpenPanel/SingleOpenPanel';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './CheckpointScroller.module.css';


const getLabel = (order, length) => {
    let label;
    if (order === 1) {
        label = '1 Start';
    } else if (length === order && length > 3 && order % 2 === 0) {
        label = `${order} Goal`;
    } else if (order % 2 === 0) {
        label = `${order} Question`;
    } else {
        label = `${order} Penalty`;
    }
    return label;
};

function CheckpointScroller(props) {
    const { checkpoints } = props;

    let panels = null;
    if (checkpoints) {
        panels = (
            <Aux>
                <Typography variant="h4" gutterBottom>Checkpoints</Typography>
                <div className={classes.checkpoints}>
                    {checkpoints.map((checkpoint) => {
                        const label = getLabel(checkpoint.order, checkpoints.length);
                        return (
                            <div key={checkpoint.order}>
                                <SingleOpenPanel
                                    type="checkpoint"
                                    object={checkpoint}
                                    label={label}
                                    expanded={props.expanded}
                                    id={checkpoint.order}
                                    handleChange={props.handleChange}
                                    onDelete={props.onDelete}
                                />
                            </div>
                        );
                    })}
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
