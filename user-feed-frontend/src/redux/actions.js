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
            console.log("stats fetched (fetchStatsActionThunk): ", stats)
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
                console.log("new stats fetched (fetchStatsActionThunk): ", newStats)
                dispatch(fetchStatsActionCreator(newStats));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

const incrementLikesActionCreator = () => ({
    type: INCR_LIKES 
})
export const incrementLikesActionThunk = (postID) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.put(
                "http://localhost:4444/api/updateLikes/" + postID, 
                { likes: getState().likes + 1 }
            );
            dispatch(incrementLikesActionCreator());
            console.log("(incrementLikesActionThunk): ", res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}

const incrementSharesActionCreator = () => ({
    type: INCR_SHARES
})
export const incrementSharesActionThunk = (postID) => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.put(
                "http://localhost:4444/api/updateShares/" + postID,
                { shares: getState().shares + 1 }
            );
            dispatch(incrementSharesActionCreator());
            console.log("(incrementSharesActionThunk): ", res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}

const addCommentActionCreator = (allComments) => ({
    type: ADD_COMMENT,
    payload: allComments
})
export const addCommentActionThunk = (newComment, postID) => {
    return async (dispatch, getState) => {
        try {
            let allComments = getState().comments;
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
            dispatch(addCommentActionCreator(allComments));
            console.log("(addCommentActionThunk): ", res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}