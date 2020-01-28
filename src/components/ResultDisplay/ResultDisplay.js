import React from 'react';
import { millisToMinutesAndSeconds } from '../../utility/Util/Util';


export default function ResultDisplay(props) {
    let totalCheckpoints = 0;
    let totalCorrect = 0;

    const { result } = props;

    result.results.forEach((pin) => {
        if (pin.questionKey) {
            totalCheckpoints += 1;
        }
        if (pin.answeredCorrect) {
            totalCorrect += 1;
        }
    });

    return (
        <div>
            <p>
                Competition:
                {result.attendee.competitionName}
            </p>
            <p>
                Track:
                {result.attendee.trackName}
            </p>
            <p>
                Username:
                {result.attendee.name}
            </p>
            <p>
                Total time:
                {result.totalTime ? millisToMinutesAndSeconds(result.totalTime) : 'Did not finish'}
            </p>
            <p>
                This runner answered
                {' '}
                {totalCorrect}
                {' '}
                out of
                {' '}
                {totalCheckpoints}
                {' '}
                questions correctly
            </p>
        </div>
    );
}
