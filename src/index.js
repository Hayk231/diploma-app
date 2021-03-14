import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Reducer from './Store/Reducer'
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";


const store = createStore(Reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
