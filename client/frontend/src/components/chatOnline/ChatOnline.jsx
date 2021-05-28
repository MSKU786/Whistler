import React from 'react';
import "./chatOnline.css"

function ChatOnline(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img 
                        src={PF+"1.jpg"} 
                        alt="" 
                        className="chatOnlineImg" 
                    />
                    <div className="chatOnlineBadge">

                    </div>
                </div>
                <span className="chatOnlineName">
                    John Doe
                </span>
            </div>
        </div>
    );
}

export default ChatOnline;