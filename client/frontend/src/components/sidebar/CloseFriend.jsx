import React from 'react';
import './sidebar.css'
function CloseFriend({user}) {
    return (
        <li className="sidebarFriend">
            <img className="sidebarImg" src={user.profilePicture} alt="friends photo"/>
            <span className="sidebarName">{user.username}</span>
        </li>
    );
}

export default CloseFriend;