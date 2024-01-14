import React from 'react';
import Body from "./body/body";
import {Footer} from "./footer/footer";
import Play from "../play/Play";
import Search from "../search/search";
import Account from "../account/Account";
import Partner from "../partner/Partner";
import Community from "../community/Community";
import Issue from "../community/edit/Issue";
import {NavBar} from "./navbar/navbar";
import Cart from "../cart/cart";
import {Route, Routes} from "react-router-dom";
import Item from "../item/item.jsx";

function Home(props) {

    const routes = [
        {
            path: '/',
            name: 'home',
            component: <Body/>
        },
        {
            path: '/*',
            name: 'home',
            component: <Body/>
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
            <Cart/>
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