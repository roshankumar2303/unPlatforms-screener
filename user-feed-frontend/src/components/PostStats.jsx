import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { incrementLikesActionThunk } from "../redux/actions"

const PostStats = () => {
    const likeCount = useSelector(state => state.likes);
    
    const dispatch = useDispatch();
    const incrementLikes = () => {
        dispatch(incrementLikesActionThunk());
    }

    return (
        <div className="my-4">
            <p style={{fontWeight: 700}}>{likeCount} Likes</p>
            <button className="post-status-btn" onClick={incrementLikes}>Like</button>
        </div>
    )
}

export default PostStats;