import React, { useState } from "react";
import Comment from "./Comment";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCommentActionThunk } from "../redux/actions"

const PostComments = (props) => {
    const allComments = useSelector((state) => {
        if(state.posts.find((post) => post.postID === props.postID) !== undefined) {
            return state.posts.find((post) => post.postID === props.postID).comments
        }
        return []
    })

    const [newComment, setComment] = useState("");
    const [disabled, disableComment] = useState(true);
    
    const dispatch = useDispatch()
    const submitComment = (event) => {
        event.preventDefault();
        setComment(newComment.trim());
        dispatch(addCommentActionThunk(newComment, props.postID));
        setComment("");
        disableComment(true);
    }

    const handleCommentChange = (event) => {
        if(event.target.value.trim().length === 0)
            disableComment(true);
        else
            disableComment(false);
        setComment(event.target.value);
    }

    return (
        <div className="comment-card">
            <form onSubmit={submitComment}>
                <div className="form-floating">
                    <textarea onChange={handleCommentChange} value={newComment} className="form-control" placeholder="Type something..." id="commentInput" />
                    <label htmlFor="commentInput">New Comment</label>
                </div>
                <button disabled={disabled} className="post-btn" type="submit">
                    <i className="fas fa-paper-plane"></i> Post Comment
                </button>
                {allComments.map((_, index, arr) => {
                    // For displaying comments in reverse...
                    let commentObj = arr[arr.length - 1 - index]
                    return <Comment
                        key={arr.length - 1 - index}
                        time={commentObj.time}
                        comment={commentObj.comment}
                    />
                })}
            </form>
        </div>
    )
}

export default PostComments;