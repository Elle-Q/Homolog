import React from 'react';
import Body from "./body/body";
import {Footer} from "./footer/footer";
import Play from "../play/play";
import Search from "../search/search";
import Account from "../account/Account";
import Partner from "../partner/Partner";
import Community from "../community/Community";
import Issue from "../community/edit/issue";
import {NavBar} from "./navbar/navbar";
import {Route, Routes} from "react-router-dom";
import Item from "../item/item.jsx";
import Order from "../order/order";
import Sidebar from "./sidebar/sidebar";
import './home.scss'

function Home() {

    const routes = [
        {
            path: '/',
            name: 'home',
            component: <Body/>
        },
        {
            path: '/order/*',
            name: 'order',
            component: <Order/>
        },
        {
            path: '/play/:id',
            name: 'play',
            component: <Play/>
        },
        {
            path: '/search',
            name: 'search',
            component: <Search/>
        },
        {
            path: '/item/:id',
            name: 'item',
            component: <Item/>
        },
        {
            path: '/account',
            name: 'account',
            component: <Account/>
        },
        {
            path: '/partner',
            name: 'partner',
            component: <Partner/>
        },
        {
            path: '/community',
            name: 'community',
            component: <Community/>
        },
        {
            path: '/issue',
            name: 'issue',
            component: <Issue/>
        },
    ]

    return (
        <div>
            <NavBar/>
            <Sidebar/>
            <Routes>
                {routes.map(({path, component}) => (
                    <Route path={path} element={component} key={path}/>
                ))}
            </Routes>
            <Footer/>
        </div>
    );
}

export default Home;