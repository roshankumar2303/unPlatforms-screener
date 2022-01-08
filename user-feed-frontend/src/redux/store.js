import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { FETCH_STATS, INCR_LIKES, INCR_SHARES } from './actions'

// Reducer function for the store
const reducer = (state = {}, action) => {
    switch (action.type) {
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
        
        case FETCH_STATS:
            return action.payload;
        
        default:
            return state;
    }
}

// Creating a store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;