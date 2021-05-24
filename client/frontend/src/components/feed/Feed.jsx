import React, { useEffect } from 'react';
import Share from '../share/Share'
import Post from '../post/Post'
import "./feed.css"
import { Posts } from "../../dummy"
import axios from "axios";


function Feed(props) {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState([]);

    useEffect(()=>{
        const fetchPosts  = async () => {
            const res = await axios.get("posts/timeline/60a90b664d9b4f4f70a18ada")
            console.log(res);
        }
        fetchPosts();
        
    },[]);
    return (
        <div className = "feed">
            <div className="feedWrapper">
                <Share />
                { Posts.map((p) =>(
                    <Post key={p.id} post={p} />
                ))}
                
            </div>
        </div>
    );
}

export default Feed;