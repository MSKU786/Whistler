import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./share.css"
function Share(props) {
    const {user} = useContext(AuthContext);
    const PF = "https://backendwhistler.herokuapp.com/images/";
    const API = "https://backendwhistler.herokuapp.com/api";
    const desc = useRef();
    const [file, setFile] = useState(null);
    console.log("This",user.username);
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userID: user._id,
            desc: desc.current.value,
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now()+file.name;
            
            data.append("name", fileName);
            data.append("file",file);
            newPost.images = fileName;  
            try {
                await axios.post(API+"/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            await axios.post(API+"/posts", newPost);
           window.location.reload();
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className= "share">
            <div className="shareWrapper">
                <div className="shareTop"> 
                    <img 
                        className = "shareProfileImg" 
                        src={user.profilePicture ? PF+ user.profilePicture : PF+"unknown.jpg" } 
                        alt = "singer1"
                    />
                    <input 
                        placeholder={"What's in your mind "+user.username+"?"} 
                        className="shareInput"
                        ref = {desc}
                    />
                </div>
                <hr className= "shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className = "shareImg" src={URL.createObjectURL(file)} alt = "No preview "/>
                        <Cancel className = "shareCancelImg" onClick={() => setFile(null)}/>
                    </div>
                )}
                <form  method="post" enctype="multipart/form-data" className="shareBottom" onSubmit={submitHandler} >
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia className = "shareIcon"  />
                            <span className = "shareOptionText">Photo or video </span>
                            <input 
                                style={{display:"none"}}
                                type= "file" id = "file" 
                                accept=".png, .jpeg, .jpg" 
                                onChange= {(e)=>setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label className = "shareIcon"  />
                            <span className = "shareOptionText">Tag </span>
                        </div>
                        <div className="shareOption">
                            <Room className = "shareIcon"  />
                            <span className = "shareOptionText">Location </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions className = "shareIcon"  />
                            <span className = "shareOptionText">React</span>
                        </div>
                     </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    );
}

export default Share;