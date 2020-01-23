import React from 'react';
import { millisToMinutesAndSeconds } from '../../Util/Util';


export default function ResultDisplay(props) {

    let totalCheckpoints = 0;
    let totalCorrect = 0;

    props.result.results.forEach(pin => {
        if (pin.questionKey) {
            totalCheckpoints++;
        }
        if (pin.answeredCorrect) {
            totalCorrect++;
        }
    });

    return (
        <div>
            <p>Competition: {props.result.attendee.competitionName}</p>
            <p>Track: {props.result.attendee.trackName}</p>
            <p>Username: {props.result.attendee.name}</p>
            <p>Total time: {props.result.totalTime ? millisToMinutesAndSeconds(props.result.totalTime) : 'Did not finish'}</p>
            <p>This runner answered {totalCorrect} out of {totalCheckpoints} questions correctly</p>
        </div>
    )
}
