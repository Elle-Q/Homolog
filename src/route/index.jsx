import React from 'react';
import Home from "../views/app/home/home";
import {Route, Routes} from "react-router-dom";
import Login from "../views/login/login";
import "../index.scss";
import "../api/api";
import CssBaseline from "@mui/material/CssBaseline";
import AlertDialog from "../components/alert/confirm/AlertDialog";
import Result from "../views/login/result/result";
import '../views/app/home/home.scss'

function Index() {

    return (
        <div>
            <CssBaseline/>
            {/*提示组件*/}
            <AlertDialog title="删除?" note="删除后不可恢复, 请谨慎操作*_*"/>
            <Routes>
                <Route path="/*" element={<Home/>} key='/'/>
                <Route path="/login" element={<Login/>} key='/login'/>
                <Route path="/login_result" element={<Result/>} key='/login_result'/>
            </Routes>

        </div>
    );
}

export default Index;
