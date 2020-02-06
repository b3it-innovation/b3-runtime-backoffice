import React from 'react';
import { millisToMinutesAndSeconds } from '../../utility/Util/Util';


export default function ResultDisplay(props) {
    let totalCheckpoints = 0;
    let totalCorrect = 0;

    const { result, userAccount } = props;

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
                UserID:
                {userAccount ? userAccount.id : ''}
            </p>
            <p>
                Username:
                {result.attendee.name}
            </p>
            <p>
                Firstname:
                {userAccount ? userAccount.firstName : ''}
            </p>
            <p>
                Lastname:
                {userAccount ? userAccount.lastName : ''}
            </p>
            <p>
                Organization:
                {userAccount ? userAccount.organization : ''}
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
