import React from 'react';
import "./profile.css";
import Topbar from '../../components/top-bar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

function Profile(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    return (
        <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={`${PF}post/3.jpg `} 
                            alt="Cover Photo" 
                            className="profileCoverImg" />
                        <img src=  {`${PF}person/3.jpg`} 
                            alt="User Photo" 
                            className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileName">Luffy</h4>
                        <p className="profileDesc">I am Monkey D Luffy and I am going to be pirate key some day </p>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                    <Rightbar profile/>
                </div>
                
            </div>
            
        </div>
    </>
    );
}

export default Profile;