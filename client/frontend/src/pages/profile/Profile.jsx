import React, { useEffect, useState } from 'react';
import "./profile.css";
import Topbar from '../../components/top-bar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import axios from 'axios';
import { useParams } from 'react-router';



function Profile(props) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
    const [ user, setUser ] = useState({});
    const username = useParams().username;
    
    useEffect(()=>{
        const fetchUser  = async () => {
            const res = await axios.get(`/users?username=${username}`)
            console.log(res);
            setUser(res.data);
        }
        fetchUser();    
    },[username]);

    return (
        <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={user.coverPicture? PF+user.coverPicture : PF+"cover.jpg"} 
                            alt="Cover Photo" 
                            className="profileCoverImg" />
                        <img src=  {user.profilePicture ? PF+user.profilePicture  : PF+"profile.jpg"} 
                            alt="User Photo" 
                            className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        {console.log(user)}
                        <h4 className="profileName">{user.username}</h4>
                        <p className="profileDesc">{user.desc}</p>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user} />
                </div>
                
            </div>
            
        </div>
    </>
    );
}

export default Profile;