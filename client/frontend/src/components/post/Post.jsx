import {  FavoriteBorder,  MoreVert, ThumbUpAlt } from '@material-ui/icons';
import React, { useEffect } from 'react';
import "./post.css"
import { Users } from "../../dummy"
import {  useState } from "react";
import { format } from "timeago.js"
import axios from 'axios';
import {Link} from "react-router-dom"

function Post({post}) {
    const [ like , setLike] = useState(post.likes.length);
    const [ isliked, setIsliked ] = useState(false);
    const [ user, setUser ] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(()=>{
        const fetchUser  = async () => {
            const res = await axios.get(`/users/${post.userID}`)
            console.log(res);
            setUser(res.data);
        }
        fetchUser();    
    },[post.userID]);


    const likeHandler = () => {
        setLike(isliked ? like-1 : like+1)
        setIsliked(!isliked ? true : false )
    }
    return (
        <div className = "post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to = {`/profile/${user.username}`}>
                            <img src={user.profilePicture || PF+"Zayn.jpg"} alt="DP" className="postProfileImg" />
                        </Link>
                        <span className="postUserName">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF+post.photo} alt="post1" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <button className="likeIcon" onClick={likeHandler}>
                            <ThumbUpAlt />
                        </button>
                        <button className="likeIcon">
                            <FavoriteBorder />
                        </button>
                        <span className="postLikeCounter">
                            {like}
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            {post.comment}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;