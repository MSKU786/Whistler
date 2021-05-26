import { EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons';
import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import "./share.css"
function Share(props) {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userID: user._id,
            desc: desc.current.value,
        }

        try {
            await axios.post("/posts", newPost)
        } catch (err) {
            
        }

    }
    return (
        <div className= "share">
            <div className="shareWrapper">
                <div className="shareTop"> 
                    <img 
                        className = "shareProfileImg" 
                        src={user.profilePicture ? PF+ user.profilePicture : PF+"Zayn.jpg" } 
                        alt = "singer1"
                    />
                    <input 
                        placeholder={"What's in your mind "+user.username+"?"} 
                        className="shareInput"
                    />
                </div>
                <hr className= "shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
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