import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css"
import Online from "./Online"
import {Link} from "react-router-dom"
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
import API from '../../utils/apiurl';
import PF from '../../utils/images'

function Rightbar({user}) {

    const[users, setUsers] = useState([])
    const{user: currentUser, dispatch} = useContext(AuthContext);
    const[friends, setFriends] = useState([]);

    const [followed, setFollowed] = useState(currentUser.following?.includes(user?.id));
    console.log(currentUser);
    // useEffect(()=>{
    //     if(currentUser.following)
    //         setFollowed(currentUser.following.includes(user?.id))
    // },[currentUser, user?.id])

    //For users
    useEffect(()=> {
        const fetchUsers = async () => {
            const res = await axios.get(API+"/users/all/User");
            setUsers(res.data);
        }
        fetchUsers();
    },[])

    //For friends
    useEffect(()=>{
        const fetchFriends = async () => {
            try {
                const friendList = await axios.get(API+"/users/friends/"+currentUser._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err );
            }
        }
        fetchFriends();
    },[currentUser._id]);
    
    const handleFollow = () => {
        try {
            if(followed) 
            {
                axios.put(API+"/users/"+user._id+"/unfollow",{userID: currentUser._id})
                
            }
            else
            {
                axios.put(API+"/users/"+user._id+"/follow",{userID: currentUser._id})
               
            }
        } catch (err) {
            console.log(err);
        }
        setFollowed(!followed)
    }
    const RightbarHome = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src={PF+"birthday.jpg"} alt="birthday" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Batisata </b> and <b>2 others poeple</b> have birthday today
                    </span>
                </div>
                <h4 className="rightbarTitle">Other People</h4>
                <ul className="rightbarFriendList">
                    {users.map((u)=> (
                         <Online key={u.id} Puser={u}/>
                    ))}
                </ul>
            </>
        )
    }

    const RightbarProfile = () => {
        return (
            <>
                {user.username !== currentUser.name && (
                    <button className="rightBarFollowButton" onClick={handleFollow}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City : </span>
                        <span className="rightbarInfoValue">{user.city || "---"} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From : </span>
                        <span className="rightbarInfoValue">{user.from || "---"} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">RelationShip: </span>
                        <span className="rightbarInfoValue">{user.relationsip || "---"} </span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        
                        <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
                            {console.log(friend.username)}
                            <div className="rightbarFollowing">
                                <img 
                                    src={PF+"profile.jpg"} 
                                    alt="friend" 
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
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