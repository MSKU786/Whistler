import React, { useEffect } from 'react';
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from "../../dummy"
import axios from "axios";
import {useState} from "react";

function Feed({username}) {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts  = async () => {
            console.log(username)
            const res = username 
                ? await axios.get("/posts/profile/"+username)
                : await axios.get("posts/timeline/60a90c6f08fc1051f84b1014")
            console.log(res);
            setPosts(res.data);
        }
        fetchPosts();
        
    },[username]);


    return (
        <div className = "feed">
            <div className="feedWrapper">
                <Share />
                { posts.map((p) =>(
                    <Post key={p._id} post={p} />
                ))}
                
            </div>
        </div>
    );
}

export default Feed;