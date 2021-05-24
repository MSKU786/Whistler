import "./Topbar.css"
import {Search, Person, Chat, Notifications} from '@material-ui/icons'
import { Link } from "react-router-dom";
function Topbar(props) {
    return (
        <div className="topbarContainer">
            
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration="none"}}>
                    <span className="logo">wwe</span>
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
                        <Chat  />
                        <span className="topbarIconBatch">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBatch">1</span>
                    </div>
                </div>
                <img src="/assets/singer2.jpg" alt="DP" className="topbarImg" />
            </div>
        </div>
    );
}

export default Topbar;