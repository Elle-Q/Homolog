import React from 'react';
import {HeaderBar} from "../home/appbar/HeaderBar";
import {Route, Routes} from "react-router-dom";
import SideBar from "./sideBar/SideBar";
import Body from "./body/Body";
import Grid from "@mui/material/Grid";

function Admin(props) {
    return (
        <React.Fragment>
            <Grid container spacing={1} sx={{
                justifyContent:"space-around",
                width:'100%'
            }}>
                <Grid item sx={{
                    minWidth:'50px',
                    maxWidth:'200px',
                    display:"flex",
                }}>
                    <SideBar/>
                </Grid>
                <Grid item style={{
                    flexGrow:1, //very important
                    display:"flex"
                }}>
                    <Body/>
                </Grid>
            </Grid>
            <Routes>
                {/*<Route path="admin" element={<Body/>}/>*/}
                {/*<Route path="/" element={<Body/>}/>*/}
                {/*<Route path="play" element={<Play/>}/>*/}
                {/*<Route path="category/:subject" element={<Category/>}/>*/}
                {/*<Route path="item/:id" element={<Item/>}/>*/}
                {/*<Route path="account" element={<Account/>}/>*/}
            </Routes>
        </React.Fragment>
    );
}

export default Admin;