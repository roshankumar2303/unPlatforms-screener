import React from "react";

const PostContent = (props) => {
    return (
        <div>
            <p className="lead mt-2">{props.postTitle}</p>
            <p>{props.postContent}</p>
        </div>
    )
}

export default PostContent;