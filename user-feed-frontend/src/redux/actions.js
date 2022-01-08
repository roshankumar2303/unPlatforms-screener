// All action creators and thunk action creators are written in this file, each of which returns a specific action object
import axios from "axios";

export const FETCH_STATS = 'FETCH_STATS';
export const INCR_LIKES = 'INCR_LIKES';

const fetchStatsActionCreator = (stats) => ({
    type: 'FETCH_STATS',
    payload: stats
})
export const fetchStatsActionThunk = () => {
    return async (dispatch) => {
        try {
            let stats = await axios.get("http://localhost:4444/api/getStats/1");
            let [dataFetched] = stats.data;     // Since stats.data is an array of single object
            if(dataFetched !== undefined) {
                // i.e., entry exists in the database...
                dispatch(fetchStatsActionCreator(dataFetched));
            }
            else {
                // No entry exists, post to create a new entry in the database
                let newStats = await axios.post("http://localhost:4444/api/newStats", {postID: "1"});
                let newDataFetched = newStats.data;
                dispatch(fetchStatsActionCreator(newDataFetched));
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

const incrementLikesActionCreator = () => ({
    type: 'INCR_LIKES' 
})
export const incrementLikesActionThunk = () => {
    return async (dispatch, getState) => {
        try {
            let msg = await axios.put("http://localhost:4444/api/updateLikes", {postID: 1, likes: getState().likes + 1});
            dispatch(incrementLikesActionCreator());
            console.log(msg.data)
        }
        catch (e) {
            console.log(e);
        }
    }
}

