import React from 'react';
import "./profile.css";
import Topbar from '../../components/top-bar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

function Profile(props) {
    return (
        <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTro">

                </div>
                <div className="profileRightBottom">
                    <Feed/>
                    <Rightbar/>
                </div>
                
            </div>
            
        </div>
    </>
    );
}

export default Profile;