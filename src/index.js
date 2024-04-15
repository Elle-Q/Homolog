import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store/store";
import {Provider} from 'react-redux'
import App from "./route/index";
import {BrowserRouter, ScrollRestoration} from "react-router-dom";
import './api/api'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<BrowserRouter>*/}
            {/*    <App/>*/}
            {/*</BrowserRouter>*/}
            <App/>
        </Provider>
    </React.StrictMode>
    ,
    document.getElementById('root')
)
;

