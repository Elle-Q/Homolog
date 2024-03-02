import React from 'react';
import Home from "../views/app/home/home";
import {Route, Routes} from "react-router-dom";
import Login from "../views/login/login";
import "../index.scss";
import "../api/api";
import CssBaseline from "@mui/material/CssBaseline";
import AlertDialog from "../components/alert/confirm/AlertDialog";
function Index() {

    const routes = [
        {
            path: '/',
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
            {/*提示组件*/}
            <AlertDialog title="删除?" note="删除后不可恢复, 请谨慎操作*_*"/>
            <Routes>
                <Route path="/*" element={<Home/>} key='/'/>
                <Route path="/login" element={<Login/>} key='/login'/>
            </Routes>
        </div>
    );
}

export default Index;
