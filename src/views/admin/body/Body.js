import React from 'react';
import {Routes, Route} from "react-router-dom";
import User from "../../../features/manage/user/user";
import Box from "@mui/material/Box";
import Category from "../../../features/manage/category/category";
import Config from "../../../features/manage/config/config";

function Body(props) {

    return (
        <Box>
            <Routes>
                <Route path="/user" element={<User/>}/>
                <Route path="/content/cat" element={<Category/>}/>
                <Route path="/content/config" element={<Config/>}/>
                {/*<Route path="play" element={<Play/>}/>*/}
                {/*<Route path="category/:subject" element={<Category/>}/>*/}
                {/*<Route path="item/:id" element={<Item/>}/>*/}
                {/*<Route path="account" element={<Account/>}/>*/}
            </Routes>
        </Box>
    );
}

export default Body;