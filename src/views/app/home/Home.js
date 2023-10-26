import React, {useEffect} from 'react';
import {NavBar} from "./nav/NavBar";
import {Route, Routes, useLocation} from "react-router-dom";
import Play from "../play/Play";
import Body from "./body/Body";
import Category from "../category/Category";
import Account from "../account/Account";
import Item from "../item/Item";
import CssBaseline from "@mui/material/CssBaseline";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "../../../styles.css";
import {Footer} from "./footer/Footer";
import Partner from "../partner/Partner";
import Community from "../community/Community";
import Issue from "../community/edit/Issue";

function Home(props) {

    const routes = [
        {path: '/home', name: 'home', component: <React.Fragment> <Body/> <Footer/></React.Fragment>},
        {path: '/', name: 'home_', component: <React.Fragment> <Body/> <Footer/></React.Fragment>},
        {path: '/play/:id', name: 'play', component: <Play/>},
        {path: '/category/:id', name: 'category', component: <Category/>},
        {path: '/item/:id', name: 'item', component: <Item/>},
        {path: '/account', name: 'account', component: <Account/>},
        {path: '/partner', name: 'partner', component: <Partner/>},
        {path: '/community', name: 'community', component: <Community/>},
        {path: '/issue', name: 'issue', component: <Issue/>},
    ]


    //todo: 我还没想好
    const AnimatedSwitch = () => {
        const location = useLocation();
        return (
            <TransitionGroup className="router-wrapper">
                <CSSTransition
                    key={location.key}
                    timeout={2000}
                    classNames="page"
                >
                    <Routes>
                        {routes.map(({path, component}, index) => (
                            <Route key={index} path={path} element={component}/>
                        ))}
                    </Routes>
                </CSSTransition>

            </TransitionGroup>
        );
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <NavBar/>
            <Routes>
                {routes.map(({path, component}, index) => (
                    <Route key={index} path={path} element={component}/>
                ))}
            </Routes>
        </React.Fragment>
    );
}

export default Home;