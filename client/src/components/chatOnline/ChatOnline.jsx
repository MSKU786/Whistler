import React, { useEffect, useState } from 'react';
import "./chatOnline.css"
import axios from "axios";

function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = "https://backendwhistler.herokuapp.com/images/";
    const API = "https://backendwhistler.herokuapp.com/api"
    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(API+"/users/friends/"+currentId);
            setFriends(res.data);
        }
        getFriends();
    },[currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter(f=>onlineUsers?.includes(f._id)));
    },[onlineUsers, friends])

    const handleClick = async (user) => {
        try{
            const res = await axios.get(`${API}/conversation/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        }catch(err){
            console.log(err);
        }
    }

    
    return (
        <div className="chatOnline">
            {onlineFriends.map(of => (
            
            <div className="chatOnlineFriend" onClick={()=>{handleClick(of)}}>
                <div className="chatOnlineImgContainer">
                    <img 
                        src={of.profilePicture ? PF+of.profilePicture : PF+"1.jpg"} 
                        alt="" 
                        className="chatOnlineImg" 
                    />
                    <div className="chatOnlineBadge">
                    </div>
                </div>
                <span className="chatOnlineName">
                   {of.username}
                </span>
            </div>
            ))}
        </div>
    );
}

export default ChatOnline;