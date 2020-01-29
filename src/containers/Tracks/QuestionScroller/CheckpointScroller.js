import React from 'react';
import Panel from '../../../components/UI/ExpansionPanel/Panel';

function CheckpointScroller(props) {
    const { checkpoints } = props;

    let panels = null;
    if (checkpoints) {
        console.log(checkpoints);
        panels = (
            checkpoints.map((checkpoint) => (
                <div>
                    <Panel type={'checkpoint'} object={checkpoint} label={checkpoint.order} />
                </div>
            ))
        );
    }

    return (
        <div>
            {panels}
        </div>
    );
}

export default CheckpointScroller;
