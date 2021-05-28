import React from 'react';
import "./rightbar.css"
import {Link} from "react-router-dom"

function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Link to={"/profile/"+user.username} style={{textDecoration:"none"}}>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={user.profilePicture? PF+user.profilePicture : PF+"unknown.jpg"} alt="1" className="rightbarProfileImg" />
                    <span className="rightbarOnline"></span>
                </div>
                <div className="rightbarUserName">{user.username}</div>
            </li>
        </Link>
    );
}

export default Online;