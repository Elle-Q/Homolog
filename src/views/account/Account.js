import React from 'react';
import Box from "@mui/material/Box";
import bg from '../../assets/bg/bg2.jpg'
import Avatar from "@mui/material/Avatar";
import UserInfo from "../../features/user-info/userInfo";
import TabBar from "../../common/TabBar";

function Account(props) {
    return (
        <div style={{backgroundColor:'#111'}}>
            <Box sx={{
                display: "flex",
                height: '600px',
                justifyContent: "center",
                alignItems: "end",
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${bg})`,
            }}>
                <UserInfo/>
            </Box>
            <TabBar/>
        </div>
    );
}

export default Account;