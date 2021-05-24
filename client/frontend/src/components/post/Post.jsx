import { Favorite, FavoriteBorder, MoreVert, ThumbUpAlt } from '@material-ui/icons';
import React from 'react';
import "./post.css"
import { Users } from "../../dummy"
function Post({post}) {
    
    return (
        <div className = "post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter((u)=>u.id===post?.userId)[0].profilePicture} alt="DP" className="postProfileImg" />
                        <span className="postUserName">{Users.filter((u)=>u.id===post?.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.photo} alt="post1" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <button className="likeIcon">
                            <ThumbUpAlt />
                        </button>
                        <button className="likeIcon">
                            <FavoriteBorder />
                        </button>
                        <span className="postLikeCounter">
                            {post.like}
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