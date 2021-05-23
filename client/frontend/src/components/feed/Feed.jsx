import React from 'react';
import Share from '../share/Share'
import "./feed.css"

function Feed(props) {
    return (
        <div className = "feed">
            <div className="feedWrapper">
                <Share />
            </div>
        </div>
    );
}

export default Feed;