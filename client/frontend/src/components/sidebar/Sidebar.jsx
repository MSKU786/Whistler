import React from 'react';
import {Bookmark, ChatBubble, Event, GolfCourse, Group, QuestionAnswer, RssFeed, Work} from "@material-ui/icons"
import "./sidebar.css"
import CloseFriend from "./CloseFriend"
import {Users} from '../../dummy.js'
function Sidebar(props) {
    return (
        <div className = "sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Feed</span>
                    </li>
                    <li className="sidebarItem">
                        <ChatBubble className = "sidebarIcon"/>
                        <span className="sidebarText">Chats</span>
                    </li>
                    <li className="sidebarItem">
                        <Group className = "sidebarIcon"/>
                        <span className="sidebarText">Groups</span>
                    </li>
                    <li className="sidebarItem">
                        <Bookmark className = "sidebarIcon"/>
                        <span className="sidebarText">Bookmarks</span>
                    </li>
                    <li className="sidebarItem">
                        <QuestionAnswer className = "sidebarIcon"/>
                        <span className="sidebarText">Question</span>
                    </li>
                    <li className="sidebarItem">
                        <Work className = "sidebarIcon"/>
                        <span className="sidebarText">Jobs</span>
                    </li>
                    <li className="sidebarItem">
                        <Event className = "sidebarIcon"/>
                        <span className="sidebarText">Event</span>
                    </li>
                    <li className="sidebarItem">
                        <GolfCourse className = "sidebarIcon"/>
                        <span className="sidebarText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More..</button>
                {/* <hr className = "sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map((u) => (
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul> */}
            </div>
        </div>
    )   
}

export default Sidebar;