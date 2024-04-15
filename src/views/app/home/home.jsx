import React from 'react';
import Body from "./body/body";
import {Footer} from "./footer/footer";
import Play from "../play/play";
import Search from "../search/search";
import Account from "../account/Account";
import Partner from "../partner/Partner";
import Community from "../community/community";
import Issue from "../community/edit/issue";
import {NavBar} from "./navbar/navbar";
import {createBrowserRouter, Outlet, Route, RouterProvider, Routes, ScrollRestoration} from "react-router-dom";
import Item from "../item/item.jsx";
import Order from "../order/order";
import Sidebar from "./sidebar/sidebar";
import Login from "../../login/login";
import LoginResult from "../../login/login-result/login-result";

function Home() {

    return (
        <div>
            <NavBar/>
            <Sidebar/>
            <Outlet />
            <ScrollRestoration />
            <Footer/>
        </div>
    );
}

export default Home;