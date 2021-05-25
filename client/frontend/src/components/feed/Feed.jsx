import React, { useEffect } from 'react';
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from "../../dummy"
import axios from "axios";
import {useState} from "react";

function Feed(props) {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState([]);

    useEffect(()=>{
        const fetchPosts  = async () => {
            const res = await axios.get("posts/timeline/60a90c6f08fc1051f84b1014");
            console.log(res);
            setPosts(res.data);
        }
        fetchPosts();
        
    },[]);
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