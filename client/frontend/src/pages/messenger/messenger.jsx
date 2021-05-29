import {  Send } from '@material-ui/icons';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Topbar from '../../components/top-bar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Conversation from '../../conversation/Conversation'
import Message from '../../conversation/Message';
import axios from "axios"
import {io} from "socket.io-client"
import "./messenger.css"


function Messenger(props) {
    const [conversations , setConversations] = useState([])
    const [currentChat , setCurrentChat] = useState(null)
    const [messages , setMessages] = useState([]);     
    const [newMessages , setNewMessages] = useState("")
    const [arrivalMessage , setArrivalMessage] = useState(null);  
    const [onlineUsers , setOnlineUsers ] = useState(null);    
    const socket = useRef();                 
    const {user} =  useContext(AuthContext);

  

    useEffect(()=> {
        socket.current = io("ws://localhost:8990");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            }) 
        })
    },[]);

    //This use effect so we other can't see the messages
    useEffect(()=> {
        arrivalMessage 
        && currentChat?.people.includes(arrivalMessage.sender) 
        && setMessages(prev=>[...prev, arrivalMessage])
    },[arrivalMessage, currentChat])


    useEffect(()=> {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            console.log("is this correct");
            setOnlineUsers(
                user.following.filter(f=>users.some(u=>u.userId===f)));
        });
    }, [user]);

 
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
    },[user._id]);

    // useEffect(()=>{
    //     scrollRef.current?.scrollIntoView({behavior: "smooth"})
    // },[messages])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessages,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.people.find(
            (receiver) => receiver !== user._id);
        //sending to socket io first
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessages,
        })
        try {
            const res = await axios.post("/messages", message );
            setMessages([...messages, res.data])
            setNewMessages("");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const gettingtheMessage = async () => {
          try {
            const res = await axios.get("/messages/" + currentChat?._id);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        gettingtheMessage();
      }, [currentChat]);

  
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
                { console.log("I think There is my anser")}
                { console.log(onlineUsers)}
                <div className="chatOnline">
                    <div className="chatOnlineContainer" >
                        <ChatOnline  
                        onlineUsers={onlineUsers} 
                        currentId = {user._id}
                        setCurrentChat = {setCurrentChat}
                        />
                    </div>
                </div>            
            </div>
        </>
      
    );
}

export default Messenger;