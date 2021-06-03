import React from 'react';
import "./rightbar.css"
import {Link} from "react-router-dom"
import API from '../../utils/apiurl';
import PF from '../../utils/images'
function Online({Puser}) {

    return (
        <Link to={"/profile/"+Puser.username} style={{textDecoration:"none"}}>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img src={Puser.profilePicture? PF+Puser.profilePicture : PF+"unknown.jpg"} alt="1" className="rightbarProfileImg" />
                    <span className="rightbarOnline"></span>
                </div>
                <div className="rightbarUserName">{Puser.username}</div>
            </li>
        </Link>
    );
}

export default Online;