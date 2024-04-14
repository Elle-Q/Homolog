import React from 'react';
import Home from "../views/app/home/home";
import {createBrowserRouter, Route, RouterProvider, Routes, ScrollRestoration} from "react-router-dom";
import Login from "../views/login/login";
import "../api/api";
import CssBaseline from "@mui/material/CssBaseline";
import AlertDialog from "../components/alert/confirm/AlertDialog";
import LoginResult from "../views/login/login-result/login-result";
import "../index.scss";
import Body from "../views/app/home/body/body";
import Order from "../views/app/order/order";
import Play from "../views/app/play/play";
import Search from "../views/app/search/search";
import Item from "../views/app/item/item";
import Account from "../views/app/account/Account";
import Partner from "../views/app/partner/Partner";
import Community from "../views/app/community/Community";
import Issue from "../views/app/community/edit/issue";

function Index() {

    const router = createBrowserRouter([
            {
                path: '/',
                element: <Home/>,
                children: [
                    {
                        path: '/',
                        element: <Body/>
                    },
                    {
                        path: 'order/*',
                        element: <Order/>
                    },
                    {
                        path: '/play/:id',
                        element: <Play/>
                    },
                    {
                        path: '/search',
                        element: <Search/>
                    },
                    {
                        path: '/item/:id',
                        element: <Item/>
                    },
                    {
                        path: '/account',
                        element: <Account/>
                    },
                    {
                        path: '/partner',
                        element: <Partner/>
                    },
                    {
                        path: '/community',
                        element: <Community/>
                    },
                    {
                        path: '/issue',
                        element: <Issue/>
                    },
                ]
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/login_result',
                element: <LoginResult/>,
            },

        ]
    );

    return (
        <div>
            <CssBaseline/>
            {/*提示组件*/}
            <AlertDialog title="删除?" note="删除后不可恢复, 请谨慎操作*_*"/>
            <RouterProvider router={router}/>
        </div>
    );
}

export default Index;
