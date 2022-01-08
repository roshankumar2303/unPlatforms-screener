import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_STATS, INCR_LIKES, INCR_SHARES, ADD_COMMENT } from './actions'

// Initial state is just to prevent errors due to undefined state parameters
const initialState = {
    posts: []
}
// Reducer function for the store
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATS: {
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        }

        case INCR_LIKES: {
            const index = state.posts.findIndex((post) => post.postID === action.payload);
            const updatedPosts = [...state.posts];
            updatedPosts[index].likes += 1;
            return {
                ...state,
                posts: updatedPosts
            };
        }

        case INCR_SHARES: {
            const index = state.posts.findIndex((post) => post.postID === action.payload);
            const updatedPosts = [...state.posts];
            updatedPosts[index].shares += 1;
            return {
                ...state,
                posts: updatedPosts
            };
        }
        
        case ADD_COMMENT: {
            const index = state.posts.findIndex((post) => post.postID === action.payload.postID);
            const updatedPosts = [...state.posts];
            updatedPosts[index].comments = action.payload.comments;
            return {
                ...state,
                posts: updatedPosts
            };
        }
        
        default:
            return state;
    }
}

// Creating a store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;