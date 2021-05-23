import React from 'react';
import {RssFeed} from "@material-ui/icons"
import "./sidebar.css"
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
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Chats</span>
                    </li>
                    <li className="sidebarItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Groups</span>
                    </li>
                    <li className="sidebarItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Bookmarks</span>
                    </li>
                    <li className="sidebarItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Question</span>
                    </li>
                    <li className="sidebarItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Jobs</span>
                    </li>
                    <li className="sidebarItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Event</span>
                    </li>
                    <li className="sidebarItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More..</button>
                <hr className = "sidebarHr"/>
                <ul className="sidebarFriendList">
                    <li className="sidebarFriend">
                        <img className="sidebarImg" src="./assets/Zayn.jpg" alt="friends photo"/>
                        <span className="sidebarName">John Cena</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarImg" src="./assets/Zayn.jpg" alt="friends photo"/>
                        <span className="sidebarName">John Cena</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarImg" src="./assets/Zayn.jpg" alt="friends photo"/>
                        <span className="sidebarName">John Cena</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarImg" src="./assets/Zayn.jpg" alt="friends photo"/>
                        <span className="sidebarName">John Cena</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarImg" src="./assets/Zayn.jpg" alt="friends photo"/>
                        <span className="sidebarName">John Cena</span>
                    </li>
                </ul>
            </div>
        </div>
    )   
}

export default Sidebar;