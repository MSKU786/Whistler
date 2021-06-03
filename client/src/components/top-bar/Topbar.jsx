import "./Topbar.css"
import {Search, Person, Chat, Notifications, Settings, ArrowDropDownIcon, ArrowDownward, ArrowDropDown} from '@material-ui/icons'
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from '../../utils/apiurl';
import PF from '../../utils/images'
import axios from "axios";
function Topbar(props) {

    const {user} = useContext(AuthContext);

    const search = useRef();
    const [searchResult, setSearchResult] = useState([]); 
    const [selected, setSelected] = useState(false);
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    let menu = useRef();
    const handleList = () => {
        setSelected(true);
    }

    useEffect(() => {
        let handler = (event)=> {
            if(!menu.current.contains(event.target)){
                setSelected(false);
            }
        }
        document.addEventListener("mousedown",handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    },[menu])
    const searchHandler = () => {
        setSelected(true);
        const fetchPeoples = async () => {
            try {
                
                const friendList = 
                    await axios.get(API+"/users/findUsers/"+
                     search.current.value);  
                setSearchResult(friendList.data);
        
            } catch(err) {
                console.log(err);
            }
        }
        fetchPeoples();
    }

    return (
        <div className="topbarContainer">
            
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Whistler</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search onClick={searchHandler} className = "searchIcon" />
                    <input ref={search} onFocus={handleList} placeholder="Search Here......." className="searchInput" />
                    <div ref={menu} className="search-resultsUser">
                        {
                            selected &&  ( searchResult.length===0 ?
                            <h3>No user found</h3> :
                            <ul className="rightbarFriendList">
                            {
                                searchResult.map((o)=>(
                                    <Link to={"/profile/"+o.username}>
                                           <li className="rightbarFriend" id="highlight">
                                                <div className="rightbarProfileImgContainer">
                                                    <img src={o.profilePicture? PF+o.profilePicture : PF+"unknown.jpg"} alt="1" className="rightbarProfileImg" id="searchImg"/>
                                                </div>
                                                <div className="rightbarUserNameSearch">{o.username}</div>
                                            </li>
                                    </Link>
                                )
                            ) }
                            </ul>
                        ) }
                    </div>
                </div>
            </div>
                
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">HomePage</span>
                    <span className="topbarLink">TimeLine</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person  />
                        <span className="topbarIconBatch">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Link to = {"/messenger/"+user._id} style={{color:"white"}}>
                            <Chat />
                        </Link>
                        
                        <span className="topbarIconBatch">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBatch">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img 
                        src={user.profilePicture ?PF+ user.profilePicture: PF+"unknown.jpg" }
                         alt="DP" 
                         className="topbarImg" 
                    />
                </Link>
                <div className="dropdown">
                    <button className="dropbtn"><ArrowDropDown/></button>
                    <div className="dropdown-content">
                        <Link to={`/Setting`}>Setting</Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </div>
                </div>
                {/* <Link to={`/Setting`}>
                    <div className="settingIcon">
                        <Settings user={user} />
                    </div>
                </Link> */}
            </div>
        </div>
    );
}

export default Topbar;