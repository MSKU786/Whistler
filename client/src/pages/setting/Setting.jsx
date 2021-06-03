import React, { useContext, useEffect, useRef, useState } from 'react';
import Topbar from '../../components/top-bar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar"
import "./setting.css"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {Link} from "react-router-dom"
import { Cancel, Delete, Edit, FavoriteBorder, MoreVert, PermMedia, RemoveFromQueueTwoTone, ThumbUpAlt } from '@material-ui/icons';
import { format } from 'timeago.js';
import API from '../../utils/apiurl';
import PF from '../../utils/images'

function Setting(props) {
    const {user} = useContext(AuthContext)
    const name = useRef();
    const desc = useRef();
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    // const [city, setCity] = useState(user.city);
    // const [from , setFrom] = useState(user.city);
    // const [relationship, setRelationship] = useState(user.relationship);
    useEffect(()=> {
        try{
            console.log("is this running");
            const postArray = async () => {
                const res = await axios.get('/posts/profile/'+user.username); 
                setUserPosts(res.data);
                
            }
            postArray();
        }catch(err)
        {
            console.log(err);
        }
    },[user])

    const deleteHandler = (id) => {
        console.log("this working");
        const data = {
            userID: user._id
          }
        const deltePost = async () => {
            try {
                const res =  await axios.delete(API+"/posts/"+ id, {data});
                console.log(res);    
                window.location.reload();
        
            } catch(err) {
                console.log(err);
            }
        }
        deltePost();
    }
  
    const handleChanges = async (e) => {
        e.preventDefault();
   
        let newName = name.current.value ? name.current.value : user.username;
        let newDesc = desc.current.value ? desc.current.value : user.desc;
        let newCity = city.current.value ? city.current.value : user.city;;
        let newFrom = from.current.value ? from.current.value : user.from;
        let newRelationship = relationship.current.value ? relationship.current.value : user.relationship;;
        let cP = user.coverPicture;
        let pP = user.profilePicture;
        const updateUser = {
            userID : user._id,
            username: newName,
            desc: newDesc,
            city: newCity,
            from: newFrom,
            relationship: newRelationship,
            coverPicture: cP,
            profielPicture: pP
        }
        if(file1){
            const data = new FormData();
            const fileName = Date.now()+file1.name;
            
            data.append("name", fileName);
            data.append("file",file1);
            updateUser.coverPicture = fileName;  
            try {
                await axios.post(API+"/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        if(file2){
            const data = new FormData();
            const fileName = Date.now()+file2.name;   
            data.append("name", fileName);
            data.append("file",file2);
            updateUser.profilePicture = fileName; 
            try {
                await axios.post(API+"/upload", data);
            } catch (err) {
                console.log(err);
            } 
        }
    
        console.log(updateUser);
        try{
            const res = await axios.put(API+"/users/"+user._id, updateUser);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <div className="settingMainContainer">
                    {file1 && (
                        <div className="settingImgContainer">
                            <img className = "settingImg" src={URL.createObjectURL(file1)} alt = "No preview "/>
                            <Cancel className = "settingCancelImg" onClick={() => setFile1(null)}/>
                        </div>
                    )}

                    {file2 && (
                        <div className="settingImgContainer2">
                            <img className = "settingImg2" src={URL.createObjectURL(file2)} alt = "No preview "/>
                            <Cancel className = "settingCancelImg2" onClick={() => setFile2(null)}/>
                        </div>
                    )}
                    <form className="settingContainer" onSubmit={handleChanges}>
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src={user.coverPicture ? PF+user?.coverPicture : PF+"cover.jpg"} 
                                    alt="Cover Phot" o
                                    className="profileCoverImg" />
                                <label htmlFor="file1" className="settingOption">
                                    <Edit className = "settingIcon1"  />
                                    <span className = "settingOptionText"></span>
                                    <input 
                                        style={{display:"none"}}
                                        type= "file" id = "file1" 
                                        accept=".png, .jpeg, .jpg" 
                                        onChange= {(e)=>setFile1(e.target.files[0])}
                                    />
                                </label>
                                <img src=  {user.profilePicture ? PF+user?.profilePicture  : PF+"profile.jpg"} 
                                    alt="User Photo" 
                                    className="profileUserImg" 
                                />
                                <label htmlFor="file2" className="settingOption">
                                    <Edit className = "settingIcon2"  />
                                    <span className = "settingOptionText"></span>
                                    <input 
                                        style={{display:"none"}}
                                        type= "file" id = "file2" 
                                        accept=".png, .jpeg, .jpg" 
                                        onChange= {(e)=>setFile2(e.target.files[0])}
                                    />
                                </label>
                            </div>
                            <div className="profileInfo">
                                {console.log(user)}
                                <input className="profileName" placeHolder={user.username} ref={name} className="inputProfileName"/>
                                <input 
                                    ref={desc} placeHolder={user?.desc?  user.desc : "Type your new discription"}
                                    className="inputProfileDesc"
                                />
                            </div>
                        </div>
                        <div className="personalInfoContainer">
                            <div className="cityContainer">
                                <input 
                                    className="profileName" 
                                    placeHolder="City" 
                                    className="inputProfileName"
                                    ref= {city}    
                                />
                            </div>
                            <div className="fromContainer">
                                <input className="profileName" 
                                    placeHolder="From" 
                                    className="inputProfileName"
                                    ref= {from}
                                />
                            </div>
                            <div className="relationshipContainer">
                                <input 
                                    className="profileDesc" 
                                    placeHolder="Relationship" 
                                    className="inputProfileName"
                                    ref= {relationship}
                                />
                            </div>
                        </div>
                        <button className="saveChangesButton" type="submit" >Save</button>
                    </form>
                    <h2 className = "titlePost"> Your Post </h2>
                <div className = "postSetting">
                     
                        { userPosts.map((post) => (
                            <div className="postWrapper" id="effects"> 
                              <div className="postTop">
                                <div className="postTopLeft">
                                    <Link to = {`/profile/${user.username}`}>
                                        <img src={user.profilePicture ? PF+user.profilePicture: PF+"1.jpg"} alt="DP" className="postProfileImg" />
                                    </Link>
                                    <span className="postUserName">{user.username}</span>
                                    <span className="postDate">{format(post.createdAt)}</span>
                                </div>
                                <div className="postTopRight">
                                    <Delete  className = "deleteIcon" onClick={()=>deleteHandler(post._id)}/>
                                </div>
                            </div>
                            <div className="postCenter">
                                <span className="postText">{post?.desc}</span>
                                <img 
                                    src={PF+post.images || PF+"1.jpg" } 

                                    alt="post1" 
                                    className="postImg" 
                                />
                            </div>   
                        </div> 
                       ))}
                   
                    </div>
                </div>
         
            </div>
        </>
    );
}

export default Setting;