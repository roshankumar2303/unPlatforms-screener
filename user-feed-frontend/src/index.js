import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { fetchStatsActionThunk } from './redux/actions'
import store from './redux/store';

import App from './components/App';

store.dispatch(fetchStatsActionThunk())

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
