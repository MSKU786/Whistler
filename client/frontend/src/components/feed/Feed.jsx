import React, { useContext, useEffect } from 'react';
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from "../../dummy"
import axios from "axios";
import {useState} from "react";
import { AuthContext } from '../../context/AuthContext';

function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        const fetchPosts  = async () => {
            console.log(username)
            const res = username 
                ? await axios.get("/posts/profile/"+username)
                : await axios.get("posts/timeline/"+user._id)
            console.log(res);
            setPosts(res.data);
        }
        fetchPosts();
        
    },[username, user._id]);


    return (
        <div className = "feed">
            <div className="feedWrapper">
                {username=== user.username && <Share />}
                { posts.map((p) =>(
                    <Post key={p._id} post={p} />
                ))}
                
            </div>
        </div>
    );
}

export default Feed;