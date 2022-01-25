import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import SideBar from "./sideBar/SideBar";
import Body from "./body/Body";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {HeaderBar} from "./appbar/HeaderBar";
import User from "../user/user";
import Box from "@mui/material/Box";

function Admin(props) {
    const [tabName, setTabName] = useState("user");

    const handleBarClilck = (tabName) => {
        setTabName(tabName)
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <HeaderBar/>
            <Grid container spacing={1} sx={{
                // justifyContent:"space-around",
                width:'100%',
                backgroundColor:'primary.main'
            }}>
                <Grid item>
                    <SideBar />
                </Grid>
                <Grid item sx={{
                    flexGrow:1  //very important
                }}>
                    <Body/>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default Admin;