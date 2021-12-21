import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./app/store";
import {Provider} from 'react-redux'
import {CSSTransition, SwitchTransition} from "react-transition-group";
import "./styles.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SwitchTransition mode="out-in">
            <CSSTransition key={"Goodbye, world!"}
                           addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
                           classNames='fade'>
                <App/>
            </CSSTransition>
        </SwitchTransition>
    </Provider>
</React.StrictMode>,
document.getElementById('root')
)
;

