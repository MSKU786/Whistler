import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import "./conversation.css" 
function Conversation({conversation, currentUser }) {
    const [user, setUser] = useState(null);
    const PF = "https://backendwhistler.herokuapp.com/images/"
    const API = "https://backendwhistler.herokuapp.com/api";
    useEffect(() => {
        const friendId = conversation.people.find(m=> m!==currentUser._id)
        const getUser = async () => {
            try{
                const res = await axios(API+"/users?userID="+friendId); 
                setUser(res.data);
            }catch(err)
            {
                console.log(err);
            }
        }
        getUser();
    },[currentUser, conversation])
    return (
        <div className="conversation">
            <img src={user?.profilePicture ? PF+user?.profilePicture: PF+"1.jpg"} alt="no img" className="conversationImg" />
            <span className="conversationName">{user?.username} </span>
        </div>
    );
}

export default Conversation;