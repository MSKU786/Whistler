import { AirportShuttleTwoTone, Send } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Topbar from '../../components/top-bar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Conversation from '../../conversation/Conversation'
import Message from '../../conversation/Message';
import axios from "axios"
import "./messenger.css"
import conversation from '../../conversation/Conversation';


function Messenger(props) {
    const [conversations , setConversations] = useState([])
    const [currentChat , setCurrentChat] = useState(null)
    const [messages , setMessages] = useState([])                          
    const {user} =  useContext(AuthContext);

    useEffect(() => {
        const getConversation = async () => {
            try{
                const res = await axios.get("/conversations/"+user._id)
                setConversations(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getConversation();    
    },[user._id])

    useEffect(()=> {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/"+currentChat?._id); 
                setMessages(res.data);
                console.log(res.data);                
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[currentChat])

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuContainer">
                        <input type="text" placeholder="search for friends" className="chatMenuInput" />
                        {
                            conversations.map((c)=>(
                                <div onClick= {()=>setCurrentChat(c)}>
                                     <Conversation conversation={c} currentUser={user}/>
                                </div>
                            ))   
                        }

                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxContainer">
                         {console.log(currentChat)}
                        { 
                        currentChat ?
                        <>
                            <div className="chatBoxTop">
                                {messages.map( m =>(
                                    <Message message={m} own={m.sender === user._id}/>
                                ))
                                }
                                
                            </div>
                            <div className="chatBoxBottom">
                                <textarea  placeholder = "write something ...." className="chatInput"></textarea>
                                <button className="sendChatButton"><Send/></button>
                            </div>
                        </> : <span className="noConversation">Open a conservation to start a chat.</span>
                        }
                    </div>
                        
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineContainer">
                        <ChatOnline />
                    </div>
                </div>            
            </div>
        </>
      
    );
}

export default Messenger;