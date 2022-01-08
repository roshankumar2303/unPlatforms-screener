import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_STATS, INCR_LIKES, INCR_SHARES, ADD_COMMENT } from './actions'

// Initial state is just to prevent errors due to undefined state parameters
const initialState = {
    likes: 0,
    shares: 0,
    views: 0,
    comments: []
}
// Reducer function for the store
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STATS:
            return action.payload;

        case INCR_LIKES:
            return {
                ...state,
                likes: state.likes + 1
            };

        case INCR_SHARES:
            return {
                ...state,
                shares: state.shares + 1
            }
        
        case ADD_COMMENT:
            return {
                ...state,
                comments: action.payload
            }
        
        default:
            return state;
    }
}

// Creating a store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;