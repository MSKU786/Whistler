import React from 'react';
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from "../../dummy"
function Feed(props) {
    return (
        <div className = "feed">
            <div className="feedWrapper">
                <Share />
                { Posts.map((p) =>(
                    <Post key={p.id} post={p} />
                ))}
                
            </div>
        </div>
    );
}

export default Feed;