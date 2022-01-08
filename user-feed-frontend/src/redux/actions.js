// All action creators and thunk action creators are written in this file, each of which returns a specific action object
import axios from "axios";

export const FETCH_STATS = 'FETCH_STATS';
export const INCR_LIKES = 'INCR_LIKES';
export const INCR_SHARES = 'INCR_SHARES';
export const ADD_COMMENT = 'ADD_COMMENT';

const fetchStatsActionCreator = (stats) => ({
    type: FETCH_STATS,
    payload: stats
})
export const fetchStatsActionThunk = () => {
    return async (dispatch) => {
        let res;
        try {
            res = await axios.get("http://localhost:4444/api/getStats/1");
            let [stats] = res.data;     // Since res.data is an array of single object
            if(stats !== undefined) {
                // i.e., entry exists in the database...
                dispatch(fetchStatsActionCreator(stats));
            }
            else {
                // No entry exists, post to create a new entry in the database
                res = await axios.post(
                    "http://localhost:4444/api/newStats", 
                    { postID: "1" }
                );
                let newStats = res.data;
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
export const incrementLikesActionThunk = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.put(
                "http://localhost:4444/api/updateLikes/1", 
                { likes: getState().likes + 1 }
            );
            dispatch(incrementLikesActionCreator());
            console.log(res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}

const incrementSharesActionCreator = () => ({
    type: INCR_SHARES
})
export const incrementSharesActionThunk = () => {
    return async (dispatch, getState) => {
        try {
            let res = await axios.put(
                "http://localhost:4444/api/updateShares/1",
                { shares: getState().shares + 1 }
            );
            dispatch(incrementSharesActionCreator());
            console.log(res.data);
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
export const addCommentActionThunk = (newComment) => {
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
                "http://localhost:4444/api/updateComments/1",
                allComments
            )
            dispatch(addCommentActionCreator(allComments));
            console.log(res.data);
        }
        catch (e) {
            console.log(e);
        }
    }
}