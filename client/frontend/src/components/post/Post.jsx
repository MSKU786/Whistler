import { Favorite, FavoriteBorder, MoreVert, ThumbUpAlt } from '@material-ui/icons';
import React from 'react';
import "./post.css"

function Post(props) {
    return (
        <div className = "post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src="./assets/singer2.jpg" alt="DP" className="postProfileImg" />
                        <span className="postUserName">John Cena</span>
                        <span className="postDate">5 mins ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">Hey! It's my first post :)</span>
                    <img src="/assets/post/1.png" alt="post1" className="postImg" />
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
                            32 people like it
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">
                            9 Comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;