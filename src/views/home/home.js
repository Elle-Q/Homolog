import React from 'react';
import {HeaderBar} from "./appbar/HeaderBar";
import {Route, Routes} from "react-router-dom";
import Play from "../play/Play";
import Body from "./body/Body";
import Category from "../category/Category";
import Account from "../account/Account";
import Item from "../item/Item";
import CssBaseline from "@mui/material/CssBaseline";

function Home(props) {
    return (
        <React.Fragment>
            <CssBaseline/>
            <HeaderBar/>
            <Routes>
                <Route path="/home" element={<Body/>}/>
                <Route path="/" element={<Body/>}/>
                <Route path="/play" element={<Play/>}/>
                <Route path="/category/:subject" element={<Category/>}/>
                <Route path="/item/:id" element={<Item/>}/>
                <Route path="/account" element={<Account/>}/>
            </Routes>


        </React.Fragment>
    );
}

export default Home;