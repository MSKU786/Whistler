import React from 'react';
import "./rightbar.css"

function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={user.profilePicture? PF+user.profilePicture : PF+"unknown.jpg"} alt="1" className="rightbarProfileImg" />
                    <span className="rightbarOnline"></span>
                </div>
                <div className="rightbarUserName">{user.username}</div>
            </li>
        
    );
}

export default Online;