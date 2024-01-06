import React, {useState} from 'react';
import SideBar from "./sideBar/SideBar";
import Body from "./body/Body";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import {HeaderBar} from "./appbar/HeaderBar";
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
            <Box
                sx={{
                    display: 'flex'
                }}>
                <SideBar/>
                <Box sx={{
                        // display: 'flex',
                        flexGrow:1,
                    }}>
                    <Body/>
                </Box>
            </Box>
            {/*<Grid container spacing={1} sx={{*/}
            {/*    // justifyContent:"space-around",*/}
            {/*    width:'100%',*/}
            {/*    backgroundColor:'primary.main',*/}
            {/*}}>*/}
            {/*    <Grid item sx={{display:"flex"}} >*/}
            {/*        <sidebar />*/}
            {/*    </Grid>*/}
            {/*    <Grid item sx={{*/}
            {/*        // flexGrow:1,  //very important*/}
            {/*    }}>*/}
            {/*        <Body/>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}

        </React.Fragment>
    );
}

export default Admin;