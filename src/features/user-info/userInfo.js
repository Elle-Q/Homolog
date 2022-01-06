import React, {createRef, useEffect, useState} from 'react';
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
import {default as AvatarModal} from "../../common/Modal";
import {default as InfoModal} from "./modal";
import UserService from "../../api/user.service";
import {authService} from "../../api/auth.service";
import {useSelector} from "react-redux";
import {selectAuth} from "../../api/authSlice";

const StyledTypography = styled(Typography)({
    color: '#bbb',
    lineHeight: '1.75em',
    fontSize: '14px',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgb(0 0 0 / 37%)'
})

function UserInfo(props) {

    const fileRef = createRef();
    const [drawerOpen, setDrawerOpen] = useState();
    const [openModal, setOpenModal] = useState(false);
    const {user} = useSelector(selectAuth);
    // const [imgUri, setImgUri] = useState(data.Preview);

    // useEffect(() => {
    //     UserService.getUserById()
    // },[])

    const toggleDrawer = open => () => {
        setDrawerOpen(open)
    }

    const logout = async () => {
        authService.logout()
        // await api.get('/app/user/logout').then((data) => {
        //     console.log(data)
        // })
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

    function changeAvatar() {
        UserService.changeAvatar()
    }

    const AvatarWithEdit = () => {
        return (
            <div style={{marginBottom: '100px'}}>
                <Avatar alt="elle"
                        src={user.Avatar}
                        sx={{
                            width: 120,
                            height: 120,
                            position: "absolute",
                            border: '8px solid #252422',
                            boxShadow: '0 0 5px #403D39',
                            cursor: "pointer"
                        }}
                        onClick={() => setOpenModal(true)}
                />
                <ActionButton icon={<EditIcon/>} name="edit" onClick={toggleDrawer(true)}/>
                <ActionButton icon={<LogoutIcon/>} name="logout" onClick={logout}/>
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
                <InfoModal/>
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

            <AvatarModal title="修改头像"
                         maxWidth="sm"
                         open={openModal}
                         handleClose={() => {
                             setOpenModal(false)
                         }}
                         handleSave={changeAvatar}
            >

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Avatar alt="elle"
                            src={user.Avatar}
                            sx={{
                                width: 120,
                                height: 120,
                                position: "absolute",
                                boxShadow: '0 0 5px #403D39',
                                cursor: "pointer"
                            }}
                    />
                </div>

                <div style={{display: "flex", justifyContent: "center", marginTop: '150px'}}>
                    <img alt="preview" style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                         src="http://pub.gomolog.com/1641393954370/c76632ec-0566-4343-b134-7002c12a63aa/avatar3.jpg"/>
                    <img alt="preview" style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                         src="http://pub.gomolog.com/1641393954370/c76632ec-0566-4343-b134-7002c12a63aa/avatar3.jpg"/>
                    <img alt="preview" style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                         src="http://pub.gomolog.com/1641393954370/c76632ec-0566-4343-b134-7002c12a63aa/avatar3.jpg"/>
                    <img alt="preview" style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                         src="http://pub.gomolog.com/1641393954370/c76632ec-0566-4343-b134-7002c12a63aa/avatar3.jpg"/>
                    <img alt="preview" style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                         src="http://pub.gomolog.com/1641393954370/c76632ec-0566-4343-b134-7002c12a63aa/avatar3.jpg"/>
                    <img alt="preview" style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                         src="http://pub.gomolog.com/1641393954370/c76632ec-0566-4343-b134-7002c12a63aa/avatar3.jpg"/>
                    <img alt="preview" style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                         src="http://pub.gomolog.com/1641393954370/c76632ec-0566-4343-b134-7002c12a63aa/avatar3.jpg"/>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>
                    <input type="file"
                           name="avatar"
                           ref={fileRef}
                           // onChange={onChange}
                           style={{display: 'none',}}/>
                    <IconButton onClick={() => fileRef.current.click()}
                                sx={{
                                    width: '200px',
                                    maxHeight: '200px',
                                    borderRadius: '5px',
                                    backgroundColor: alpha('#252422', 0.3),
                                    '&:hover': {
                                        backgroundColor: alpha('#252422', 0.1)
                                    }
                                }}
                    >
                        <span style={{fontSize: '16px', color: '#3399ff'}}>+ 上传图片</span>
                    </IconButton>
                </div>
            </AvatarModal>
        </Box>
    );
}

export default UserInfo;