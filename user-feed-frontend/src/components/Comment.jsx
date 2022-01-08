import React from "react";

const Comment = (props) => {
    return (
        <div>
            <p className="comment-timestamp">{props.time}</p>
            <p className="comment">{props.comment}</p>
        </div>
    )
}

export default Comment;