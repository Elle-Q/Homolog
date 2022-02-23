import React from 'react';
import {Routes, Route} from "react-router-dom";
import User from "../../user/User";
import Box from "@mui/material/Box";
import Category from "../../category/Category";
import Config from "../../config/Config";
import Item from "../../item/Item";
import Upload from "../../upload/Upload";

function Body(props) {

    return (
        <Box>
            <Routes>
                <Route path="/user" element={<User/>}/>
                <Route path="/content/cat" element={<Category/>}/>
                <Route path="/content/config" element={<Config/>}/>
                <Route path="/content/item" element={<Item/>}/>
                <Route path="/content/upload" element={<Upload/>}/>
                {/*<Route path="play" element={<Play/>}/>*/}
                {/*<Route path="category/:subject" element={<Category/>}/>*/}
                {/*<Route path="account" element={<Account/>}/>*/}
            </Routes>
        </Box>
    );
}

export default Body;