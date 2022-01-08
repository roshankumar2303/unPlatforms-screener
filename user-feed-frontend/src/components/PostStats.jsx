import React from "react";
import { useSelector, useDispatch } from "react-redux"
import { incrementLikesActionThunk ,incrementSharesActionThunk } from "../redux/actions"

const PostStats = () => {
    const likeCount = useSelector(state => state.likes);
    const viewCount = useSelector(state => state.views);
    const shareCount = useSelector(state => state.shares);
    
    const dispatch = useDispatch();
    const incrementLikes = () => {
        dispatch(incrementLikesActionThunk());
    }
    const incrementShares = () => {
        dispatch(incrementSharesActionThunk());
    }

    return (
        <div className="my-4">
            <p style={{fontWeight: 700}}>{likeCount} Likes | {shareCount} Shares | {viewCount} views</p>
            <div>
                <button className="post-status-btn" onClick={incrementLikes}>Like</button>
                <button className="post-status-btn" onClick={incrementShares}>Share</button>
            </div>
        </div>
    )
}

export default PostStats;