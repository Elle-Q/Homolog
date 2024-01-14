import React from 'react';
import Home from "../views/app/home/home";
import {Route, Routes} from "react-router-dom";
import Login from "../views/login/login";
import "../index.scss";
import "../api/api";
import CssBaseline from "@mui/material/CssBaseline";
function Index() {

    const routes = [
        {
            path: '/',
            name: 'home',
            component: <Home/>
        },
        {
            path: '/*',
            name: 'home',
            component: <Home/>
        },
        {
            path: '/login',
            name: 'login',
            component: <Login/>
        }
    ]

    return (
        <div>
            <CssBaseline/>
            <Routes>
                {routes.map(({path, component}) => (
                    <Route path={path} element={component} key={path}/>
                ))}
            </Routes>
        </div>
    );
}

export default Index;
