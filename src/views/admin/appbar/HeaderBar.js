import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import logo from '../../../assets/cat.svg'
import AppLogo from "../../../common/AppLogo";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import {StyledBadge} from "../../../common/StyledComponent";


function HeaderBar(props) {
    return (
        <Box sx={{
            flexGrow: 1,
            boxShadow: "none",
            position: "sticky",
            zIndex: 50,
            top: 0,
            width:'100%',
            alignItems: 'flex-end',
        }}>
            <AppBar position="static">
                <Toolbar sx={{
                    // backgroundColor: 'secondary.main',
                    display: 'inline-flex',
                    minHeight: '64px'
                }}>
                    <AppLogo/>
                    <Box sx={{flexGrow: 10}}/>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        variant="dot"
                        component={Link} to={"/account"}
                    >
                        <Avatar alt="elle" src="/avatar/avatar1.jpg"/>
                    </StyledBadge>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export {HeaderBar};