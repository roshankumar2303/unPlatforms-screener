import React, { useState } from "react";
import PostComments from "./PostComments";

import { useSelector, useDispatch } from "react-redux"
import { incrementLikesActionThunk ,incrementSharesActionThunk } from "../redux/actions"

const PostStats = (props) => {    
    const likeCount = useSelector((state) => {
        if(state.posts.find((post) => post.postID === props.postID) !== undefined)
            return state.posts.find((post) => post.postID === props.postID).likes;
        return 0;
    });
    const viewCount = useSelector((state) => {
        if(state.posts.find((post) => post.postID === props.postID) !== undefined)
            return state.posts.find((post) => post.postID === props.postID).views;
        return 0;
    });
    const shareCount = useSelector((state) => {
        if(state.posts.find((post) => post.postID === props.postID) !== undefined)
            return state.posts.find((post) => post.postID === props.postID).shares;
        return 0;
    });
    const commentCount = useSelector((state) => {
        if(state.posts.find((post) => post.postID === props.postID) !== undefined)
            return state.posts.find((post) => post.postID === props.postID).comments.length;
        return 0;
    });
    
    const dispatch = useDispatch();
    const incrementLikes = () => {
        dispatch(incrementLikesActionThunk(props.postID));
    }
    const incrementShares = () => {
        dispatch(incrementSharesActionThunk(props.postID));
    }

    const [visible, setVisibility] = useState(false);
    const toggleCommentVisibility = () => {
        return setVisibility(!visible);
    }

    return (
        <div className="my-4">
            <p style={{fontWeight: 700}}>{viewCount} views | {likeCount} Likes | {shareCount} Shares | {commentCount} Comments</p>
            <div>
                <button className="post-btn" onClick={incrementLikes}>
                    <i className="fas fa-heart" /> Like
                </button>
                <button className="post-btn" onClick={incrementShares}>
                    <i className="fas fa-share" /> Share
                </button>
                <button className="post-btn" onClick={toggleCommentVisibility}>
                    <i className="fas fa-comment"></i> {visible ? "Hide Comments" : "Comment"}
                </button>
            </div>
            {visible && <PostComments postID={props.postID}/>}
        </div>
    )
}

export default PostStats;