import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css"
import Online from "./Online"
import {Users} from '../../dummy.js'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Add } from '@material-ui/icons';

function Rightbar({user}) {
    const {user: currentUser} = useContext(AuthContext);
    const[friends, setFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 

    useEffect(()=>{
        const fetchFriends = async () => {
            try {
                const res = await axios.get("/users/friends/"+currentUser._id);
                setFriends(res.data);
            } catch (err) {
                console.log(err );
            }
        }
        fetchFriends();
    },[currentUser._id]);
    
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
                {user.username !== currentUser.name && (
                    <button className="rightBarFollowButton">
                        Follow <Add />
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City : </span>
                        <span className="rightbarInfoValue">{user.city || "Newyork"} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From : </span>
                        <span className="rightbarInfoValue">{user.from || "Madrid"} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">RelationShip: </span>
                        <span className="rightbarInfoValue">{user.relationsip || "Single"} </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => {
                        <div className="rightbarFollowing">
                            <img 
                                src="assets/person/1.jpg" 
                                alt="" 
                                className="rightbarFollowingImg"
                             />
                        <span className="rightbarFollowingName">{friend.username}</span>
                    </div>
                    })}
                        
           
                </div>
            </>
            
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <RightbarProfile/> : <RightbarHome/> }
            </div>
        </div>
    );
}

export default Rightbar;