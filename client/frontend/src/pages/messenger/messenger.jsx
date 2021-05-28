import React from 'react';
import Topbar from '../../components/top-bar/Topbar';
import Conversation from '../../conversation/Conversation'
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

                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineContainer">

                    </div>
                </div>            
            </div>
        </>
      
    );
}

export default messenger;