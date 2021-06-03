import React, { useEffect, useState } from 'react';
import "./profile.css";
import Topbar from '../../components/top-bar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import axios from 'axios';
import { useParams } from 'react-router';
import API from '../../utils/apiurl';
import PF from '../../utils/images'

function Profile(props) {
    //const PF = "https://backendwhistler.herokuapp.com/images/"
    //const API = "https://backendwhistler.herokuapp.com/api";
    const [ currentUser, setCurrentUser ] = useState({});
    console.log(useParams());
    const username = useParams().loggedInname;
    console.log(username);
    useEffect(()=>{
        const fetchUser  = async () => {
            const res = await axios.get(`${API}/users?username=${username}`)
            console.log("what is this",res);
            setCurrentUser(res.data);
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
                        <img src={currentUser.coverPicture? PF+currentUser.coverPicture : PF+"cover.jpg"} 
                            alt="Cover Photo" 
                            className="profileCoverImg" />
                        <img src=  {currentUser.profilePicture ? PF+currentUser.profilePicture  : PF+"profile.jpg"} 
                            alt="currentUser Photo" 
                            className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        {console.log(currentUser)}
                        <h4 className="profileName">{currentUser.username}</h4>
                        <p className="profileDesc">{currentUser.desc}</p>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={currentUser} />
                </div>
                
            </div>
            
        </div>
    </>
    );
}

export default Profile;