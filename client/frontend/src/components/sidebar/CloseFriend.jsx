import React from 'react';
import './sidebar.css'
function CloseFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="sidebarFriend">
            <img className="sidebarImg" src={PF+user.profilePicture} alt="friends photo"/>
            <span className="sidebarName">{user.username}</span>
        </li>
    );
}

export default CloseFriend;