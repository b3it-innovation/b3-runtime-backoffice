import React from 'react';

function CheckpointScroller(props) {
    const { checkpoints } = props;

    let panels = null;
    if (checkpoints) {
        console.log(checkpoints);
        panels = (
            checkpoints.map((checkpoint) => (
                <div>
                    <p>{checkpoint.lat.toString()}</p>
                    <p>{checkpoint.lng.toString()}</p>
                    <p>{checkpoint.order.toString()}</p>
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
