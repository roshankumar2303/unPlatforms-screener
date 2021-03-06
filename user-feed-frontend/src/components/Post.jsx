import React, { useEffect } from "react";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostStats from "./PostStats";

import { useDispatch } from "react-redux";
import { fetchStatsActionThunk } from "../redux/actions";

const Post = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStatsActionThunk(props.postID))
    })

    return (
        <div className="card my-3 px-3 mx-auto" style={{ maxWidth: "720px" }}>
            <div className="card-body">
                <PostHeader
                    userPic={props.userPic}
                    userName={props.userName}
                    userDetails={props.userDetails}
                    postDetails={props.postDetails}
                />
                <PostContent 
                    postTitle={props.postTitle}
                    postContent={props.postContent}
                />
                <PostStats 
                    postID={props.postID}
                />
            </div>
        </div>
    )
}

export default Post;