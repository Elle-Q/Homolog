import React, {useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {alpha, styled} from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import {Drawer} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import api from "../../api/api";
import Modal from "./modal";

const StyledTypography = styled(Typography)({
    color: '#bbb',
    lineHeight: '1.75em',
    fontSize: '14px',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgb(0 0 0 / 37%)'
})

function UserInfo(props) {

    const [drawerOpen, setDrawerOpen] = useState();

    const toggleDrawer = open => () => {
        setDrawerOpen(open)
    }

    const logout = async () => {
        await api.get('/app/user/logout').then((data) => {
            console.log(data)
        })
    }

    const ActionButton = (props) => {
        const {icon, onClick, name} = props;

        return (
            <IconButton onClick={onClick}
                        sx={{
                            position: "relative",
                            left: `${name === 'logout' ? 30 : 70}px`,
                            top: `${name === 'logout' && 80}px`,
                            backgroundColor: alpha('#252422', 0.5),
                            '&:hover': {
                                transform: 'scale(1.3)',
                                transition: 'all .2s ease .2s'
                            }
                        }}>
                {icon}
            </IconButton>
        )
    }

    const AvatarWithEdit = () => {
        return (
            <div style={{marginBottom: '100px'}}>
                <Avatar alt="elle" src="/avatar/avatar1.jpg"
                        sx={{
                            width: 120,
                            height: 120,
                            position: "absolute",
                            border:'8px solid #252422',
                            boxShadow: '0 0 5px #403D39',
                        }}/>
                <ActionButton icon={<EditIcon/>} name="edit" onClick={toggleDrawer(true)}/>
                <ActionButton icon={<LogoutIcon/>} name="logout" onClick={logout}/>
                ZZ
            </div>
        )
    }


    return (
        <Box sx={{mb: '20px', textAlign: "center"}}>
            <AvatarWithEdit/>
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: alpha('#252422', 0.9),
                    }
                }}
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Modal/>
            </Drawer>

            <Typography variant="h6" sx={{display: {xs: 'none', sm: 'block'}}}>
                ELLE QU
            </Typography>

            <Typography variant="body" sx={{
                color: '#bbb',
                lineHeight: '1.75em',
                fontSize: '14px',
                textShadow: '1px 1px 2px rgb(0 0 0 / 37%)'
            }}>
                我 小可爱
            </Typography>
            <StyledTypography>
                <RoomOutlinedIcon fontSize="small"/>shanghai, china
            </StyledTypography>
        </Box>
    );
}

export default UserInfo;