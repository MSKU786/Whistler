import {  Search, Send } from '@material-ui/icons';
import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Topbar from '../../components/top-bar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import Conversation from '../../conversation/Conversation'
import Message from '../../conversation/Message';
import axios from "axios"
import {io} from "socket.io-client"
import "./messenger.css"
import { useHistory, useParams } from 'react-router';


function Messenger(props) {
    const id = useParams().id;
    const history = useHistory();
    const [conversations , setConversations] = useState([])
    const [currentChat , setCurrentChat] = useState(null)
    const [messages , setMessages] = useState([]);     
    const [newMessages , setNewMessages] = useState("")
    const [arrivalMessage , setArrivalMessage] = useState(null);  
    const [onlineUsers , setOnlineUsers ] = useState(null);
    const [searchResultF, setSearchResultF] = useState([]); 
    const [selected, setSelected] = useState(false);    
    const socket = useRef();                 
    const {user} = useContext(AuthContext)
    const searchF = useRef();
    const menu = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleList = () => {
        setSelected(true);
    }

 
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
            if(user ) 
            {
            setOnlineUsers(
                user.following?.filter(f=>users.some(u=>u?.userId===f)));
            }
            else
            {
                
            }
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

    const searchFriendHandler = () => {
        setSelected(true);
        const fetchPeoples = async () => {
            try {
                console.log("running");
                const friendList = 
                    await axios.get(`/users/SearchFriends/${searchF.current.value}/${user._id}`);
                setSearchResultF(friendList.data);
        
            } catch(err) {
                console.log(err);
            }
        }
        fetchPeoples();
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

    const handleConversation = (id) => {
        const fetchConversation = async () => {
            try {
               
                const data = JSON.stringify({
                    senderID: user._id,
                    recieverID: id
                })
                console.log("This is id",data);
                const res =  await axios.post("/conversations", ({senderID: user._id, recieverID: id}));
                console.log(res);    
                window.location.reload();
        
            } catch(err) {
                console.log(err);
            }
        }
        fetchConversation();
    }
  
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuContainer">
                        <Search onClick={searchFriendHandler} className = "searchIcon" />
                        <input ref={searchF} onFocus={handleList} type="text" placeholder="search for friends" className="chatMenuInput" />
                        <div ref={menu} className="search-resultsUserM">
                        {
                            selected &&  ( searchResultF.length===0 ?
                            <h3>No user found</h3> :
                            <ul className="rightbarFriendList">
                            {
                                searchResultF.map((o)=>(
                                    <li className="rightbarFriend" id="highlight" onClick={()=> handleConversation(o._id)}>
                                        <div className="rightbarProfileImgContainer">
                                            <img src={o.profilePicture? PF+o.profilePicture : PF+"unknown.jpg"} alt="1" className="rightbarProfileImg" id="searchImg"/>
                                        </div>
                                        <div className="rightbarUserNameSearch">{o.username}</div>
                                    </li>
                                )
                            ) }
                            </ul>
                        ) }
                    </div>
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