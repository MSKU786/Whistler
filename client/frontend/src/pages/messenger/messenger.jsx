import { AirportShuttleTwoTone, Send } from '@material-ui/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Topbar from '../../components/top-bar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Conversation from '../../conversation/Conversation'
import Message from '../../conversation/Message';
import axios from "axios"
import "./messenger.css"


function Messenger(props) {
    const [conversations , setConversations] = useState([])
    const [currentChat , setCurrentChat] = useState(null)
    const [messages , setMessages] = useState([])        
    const [newMessages , setNewMessages] = useState("")                     
    const {user} =  useContext(AuthContext);
    const scrollRef = useRef();

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
                console.log("this is what i am looking for");
                console.log(res.data);                
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[currentChat])

    useEffect(()=>{
        scrollRef.current?|.scrollIntoView({behavior: "smooth"})
    },[messages])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessages,
            conversationId: currentChat._id
        }

        try {
            const res = await axios.post("/messages", message );
            console.log(res);
            setMessages([...messages, res.data])
            setNewMessages("");
        } catch (err) {
            console.log(err);
        }
    }

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
                                    <div ref="scrollRef">
                                        <Message message={m} own={m.sender === user._id}/>
                                    </div>
                                    
                                ))
                                }
                                
                            </div>
                            <div className="chatBoxBottom">
                                <textarea  
                                    placeholder = "write something ...." 
                                    className="chatInput"
                                    onChange= {(e)=>setNewMessages(e.target.value)}
                                    value = {newMessages}
                                ></textarea>
                                <button className="sendChatButton" onClick={handleSubmit}><Send/></button>
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