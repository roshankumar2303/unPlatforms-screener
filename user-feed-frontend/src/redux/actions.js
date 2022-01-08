// All action creators and thunk action creators are written in this file
import axios from "axios";

export const FETCH_STATS = 'FETCH_STATS';
export const INCR_LIKES = 'INCR_LIKES';
export const INCR_SHARES = 'INCR_SHARES';
export const ADD_COMMENT = 'ADD_COMMENT';

const fetchStatsActionCreator = (stats) => ({
    type: FETCH_STATS,
    payload: stats
})
export const fetchStatsActionThunk = (postID) => {
    return async (dispatch) => {
        let res;
        try {
            res = await axios.get("http://localhost:4444/api/getStats/" + postID);
            let [stats] = res.data;     // Since res.data is an array of single object
            console.log("POST ID:", postID, " stats fetched (fetchStatsActionThunk): ", stats)
            if(stats !== undefined) {
                // i.e., entry exists in the database...
                dispatch(fetchStatsActionCreator(stats));
            }
            else {
                // No entry exists, post to create a new entry in the database
                res = await axios.post(
                    "http://localhost:4444/api/newStats", 
                    { postID: postID }
                );
                let newStats = res.data;
                console.log("POST ID:", postID, " new stats fetched (fetchStatsActionThunk): ", newStats)
                dispatch(fetchStatsActionCreator(newStats));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

const incrementLikesActionCreator = (postID) => ({
    type: INCR_LIKES,
    payload: postID 
})
export const incrementLikesActionThunk = (postID) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.put(
                "http://localhost:4444/api/updateLikes/" + postID, 
                { likes: getState().posts.find((post) => post.postID === postID).likes + 1 }
            );
            dispatch(incrementLikesActionCreator(postID));
            console.log("POST ID:", postID, " (incrementLikesActionThunk): ", res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}

const incrementSharesActionCreator = (postID) => ({
    type: INCR_SHARES,
    payload: postID
})
export const incrementSharesActionThunk = (postID) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.put(
                "http://localhost:4444/api/updateShares/" + postID,
                { shares: getState().posts.find((post) => post.postID === postID).shares + 1 }
            );
            dispatch(incrementSharesActionCreator(postID));
            console.log("POST ID:", postID, " (incrementSharesActionThunk): ", res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}

const addCommentActionCreator = (postID, allComments) => ({
    type: ADD_COMMENT,
    payload: {
        postID: postID,
        comments: allComments
    }
})
export const addCommentActionThunk = (newComment, postID) => {
    return async (dispatch, getState) => {
        try {
            let allComments = getState().posts.find((post) => post.postID === postID).comments;
            // console.log(`New comment in thunk: ${newComment}`)
            allComments.push(
                {
                    time: new Date().toLocaleString('en-IN'),
                    comment: newComment
                }
            )
            let res = await axios.put(
                "http://localhost:4444/api/updateComments/" + postID,
                allComments
            )
            dispatch(addCommentActionCreator(postID, allComments));
            console.log("POST ID:", postID, " (addCommentActionThunk): ", res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}