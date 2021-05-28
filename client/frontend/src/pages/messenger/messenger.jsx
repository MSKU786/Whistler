import { Send } from '@material-ui/icons';
import React from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Topbar from '../../components/top-bar/Topbar';
import Conversation from '../../conversation/Conversation'
import Message from '../../conversation/Message';
import "./messenger.css"
function messenger(props) {
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuContainer">
                        <input type="text" placeholder="search for friends" className="chatMenuInput" />
                        <Conversation />

                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxContainer">
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true}/>
                            <Message />
                            <Message />
                            <Message own={true}/>
                            <Message />
                            <Message />
                            <Message own={true}/>
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea  placeholder = "write something ...." className="chatInput"></textarea>
                            <button className="sendChatButton"><Send/></button>
                        </div>
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

export default messenger;