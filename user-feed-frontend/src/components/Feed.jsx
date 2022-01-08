import React from "react";
import Post  from "./Post";
import posts from "../posts.json";

// console.log(posts)

const Feed = () => {
    return posts.map((post, index) => (
        <Post
            key={index}
            postID={post.postID}
            userPic={post.userPic}
            userName={post.userName}
            userDetails={post.userDetails}
            postDetails={post.postDetails}
            postTitle={post.postTitle}
            postContent={post.postContent}
        />
    ))
}

export default Feed;