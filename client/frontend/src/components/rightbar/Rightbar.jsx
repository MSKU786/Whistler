import React from 'react';
import "./rightbar.css"
import Online from "./Online"
import {Users} from '../../dummy.js'

function Rightbar(props) {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
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
            </div>
        </div>
    );
}

export default Rightbar;