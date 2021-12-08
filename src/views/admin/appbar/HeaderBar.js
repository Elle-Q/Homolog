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

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


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
                    backgroundColor: 'secondary.main',
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