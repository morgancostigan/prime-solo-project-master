import React from 'react';

// This is only here for logged in users who try to go to brewers only pages

const BrewerWall = () => (
    <div>
        <div>
            <p>
                You must be a registered brewer to go here.
            </p>
        </div>
    </div>
);

export default BrewerWall;