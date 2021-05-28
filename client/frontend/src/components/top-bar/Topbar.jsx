import "./Topbar.css"
import {Search, Person, Chat, Notifications} from '@material-ui/icons'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Topbar(props) {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarContainer">
            
            <div className="topbarLeft">
                <Link to="/" >
                    <span className="logo">Whistler</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className = "searchIcon" />
                    <input placeholder="Search Here......." className="searchInput" />
                </div>
            </div>
                
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">HomePage</span>
                    <span className="topbarLink">TimeLine</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBatch">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Link to = "/messenger">
                            <Chat  />
                        </Link>
                        
                        <span className="topbarIconBatch">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBatch">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ?PF+ user.profilePicture: PF+"unknown.jpg" } alt="DP" className="topbarImg" />
                </Link>
            </div>
        </div>
    );
}

export default Topbar;