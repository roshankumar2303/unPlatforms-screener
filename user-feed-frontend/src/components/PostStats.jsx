import React, { useState } from "react";
import PostComments from "./PostComments";

import { useSelector, useDispatch } from "react-redux"
import { incrementLikesActionThunk ,incrementSharesActionThunk } from "../redux/actions"

const PostStats = () => {
    const likeCount = useSelector(state => state.likes);
    const viewCount = useSelector(state => state.views);
    const shareCount = useSelector(state => state.shares);
    const commentCount = useSelector(state => state.comments.length);
    
    const dispatch = useDispatch();
    const incrementLikes = () => {
        dispatch(incrementLikesActionThunk());
    }
    const incrementShares = () => {
        dispatch(incrementSharesActionThunk());
    }

    const [visible, setVisibility] = useState(false);
    const toggleCommentVisibility = () => {
        return setVisibility(!visible);
    }

    return (
        <div className="my-4">
            <p style={{fontWeight: 700}}>{viewCount} views | {likeCount} Likes | {shareCount} Shares | {commentCount} Comments</p>
            <div>
                <button className="post-btn" onClick={incrementLikes}>Like</button>
                <button className="post-btn" onClick={incrementShares}>Share</button>
                <button className="post-btn" onClick={toggleCommentVisibility}>{visible ? "Hide Comments" : "Comment"}</button>
            </div>
            {visible && <PostComments />}
        </div>
    )
}

export default PostStats;