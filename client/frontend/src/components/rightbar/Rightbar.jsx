import React from 'react';
import "./rightbar.css"
import Online from "./Online"
import {Users} from '../../dummy.js'

function Rightbar({profile}) {
    const rightbarHome = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="./assets/birthday.jpg" alt="birthday" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Batisata </b> and <b>2 others poeple</b> have birthday today
                    </span>
                </div>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u)=> (
                         <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        )
    }

    const rightbarProfile = () => {
        return (
            <h1>It 's profile dammit</h1>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                
            </div>
        </div>
    );
}

export default Rightbar;