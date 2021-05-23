import { PermMedia } from '@material-ui/icons';
import React from 'react';
import "./share.css"
function Share(props) {
    return (
        <div className= ".share">
            <div className="shareWrapper">
                <div className="shareTop"> 
                    <img className = "shareProfileImg" src="./assets/singer2.jpg" alt = "singer1"/>
                    <input placeholder="What's in your mind?" className="shareInput" />
                </div>
                <hr className= "shareHr" />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia className = "shareIcon"  />
                            <span className = "shareOptionText">Photo or video </span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default Share;