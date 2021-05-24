import React from 'react';
import "./rightbar.css"

function Online({user}) {
    return (
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={user.profilePicture} alt="1" className="rightbarProfileImg" />
                    <span className="rightbarOnline"></span>
                </div>
                <div className="rightbarUserName">{user.username}</div>
            </li>
        
    );
}

export default Online;