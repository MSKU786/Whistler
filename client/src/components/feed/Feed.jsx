import React, { useContext, useEffect } from 'react';
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import axios from "axios";
import {useState} from "react";
import { AuthContext } from '../../context/AuthContext';
import API from '../../utils/apiurl';
import PF from '../../utils/images'
function Feed({username}) {

    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(()=>{
        const fetchPosts  = async () => {
            console.log(username)
            const res = username 
                ? await axios.get(API+"/posts/profile/"+username)
                : await axios.get(API+"/posts/timeline/"+user._id)
            console.log(res);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createedAt) - new Date(p1.createedAt);
                }));
        }
        fetchPosts();
        
    },[username, user._id]);


    return (
        <div className = "feed">
            <div className="feedWrapper">
                {(!username || username=== user.username) && <Share />}
                { posts.map((p) =>(
                    <Post key={p._id} post={p} />
                ))}   
            </div>
        </div>
    );
}

export default Feed;