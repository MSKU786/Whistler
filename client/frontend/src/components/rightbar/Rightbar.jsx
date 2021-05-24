import React from 'react';
import "./rightbar.css"
import Online from "./Online"
import {Users} from '../../dummy.js'

function Rightbar({profile}) {
    const RightbarHome = () => {
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

    const RightbarProfile = () => {
        return (
            <>
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City : </span>
                        <span className="rightbarInfoValue">Newyork </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From : </span>
                        <span className="rightbarInfoValue">Madrid </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">RelationShip: </span>
                        <span className="rightbarInfoValue">Single </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img src="assets/person/1.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John Cena</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/2.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John Cena</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/3.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John Cena</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/4.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John Cena</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/1.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John Cena</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="assets/person/2.jpg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">John Cena</span>
                    </div>
                </div>
            </>
            
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {profile ? <RightbarProfile/> : <RightbarHome/> }
            </div>
        </div>
    );
}

export default Rightbar;