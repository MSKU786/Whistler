import React from 'react';
import "./conversation.css" 

function Message({own }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    return (
        <div className={own ? "message own" : "message"} > 
            <div className="messageTop">
                <img 
                    src={PF+"1.jpg"} 
                    alt="" 
                    className="messageImg" 
                />
                <p className="messageText">hello this is a message</p>
            </div>
            <div className="messageBottom">
                1 hour ago  
            </div>
        </div>
    );
}

export default Message;