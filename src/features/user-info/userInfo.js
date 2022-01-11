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
import {default as AvatarModal} from "../../common/Modal";
import {default as InfoModal} from "./modal";
import {authService} from "../../api/auth.service";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, setUser} from "../../api/authSlice";
import {upload} from "../../api/qiniu.service";
import DragAndDrop from "../../common/DragAndDrop";
import {getDefaultAvatar} from "../../api/config.service";
import {changeAvatar, getUser, updateAvatar} from "../../api/user.service";

const StyledTypography = styled(Typography)({
    color: '#bbb',
    lineHeight: '1.75em',
    fontSize: '14px',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgb(0 0 0 / 37%)'
})


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

function UserInfo(props) {

    const fileRef = createRef();
    const {userId, user} = useSelector(selectAuth);
    const [drawerOpen, setDrawerOpen] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [avatarUri, setAvatarUri] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [defaultAvatars, setDefaultAvatars] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        avatarFile && setAvatarUri(URL.createObjectURL(avatarFile));
    },[avatarFile])

    useEffect(() => {
        user && setAvatarUri(user.Avatar)
    }, [user])

    const toggleDrawer = open => () => {
        setDrawerOpen(open)
    }

    const logout = async () => {
        authService.logout()
    }

    const onAvatarChange = (event) => {
        if (event.target.type === 'file') {
            setAvatarFile(event.target.files[0]);
        }
    }

    const handleDrop = (files) => {
        setAvatarFile(files[0])
    }

    function changeAvatar() {
        //上传头像到qiniu
        upload(avatarFile).then((link) => {
            debugger
            // dispatch(setUser({
            //     ...user,
            //     Avatar: link
            // }))
            //更新数据库
            dispatch(updateAvatar(user.ID, link))
            setOpenModal(false)
        })

    }

    const onClickAvatar = () => {
        setOpenModal(true)
        //获取默认头像
        getDefaultAvatar().then(resp => {
            setDefaultAvatars(resp)
        })
    }

    const AvatarWithEdit = () => {
        return (
            <div style={{marginBottom: '100px'}}>
                <Avatar alt="elle"
                        src={avatarUri}
                        sx={{
                            width: 120,
                            height: 120,
                            position: "absolute",
                            border: '8px solid #252422',
                            boxShadow: '0 0 5px #403D39',
                            cursor: "pointer"
                        }}
                        onClick={onClickAvatar}
                />
                <ActionButton icon={<EditIcon/>} name="edit" onClick={toggleDrawer(true)}/>
                <ActionButton icon={<LogoutIcon/>} name="logout" onClick={logout}/>
            </div>
        )
    }


    function renderDefaluAvatars() {
        defaultAvatars.map()
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
                <InfoModal user={user}/>
            </Drawer>

            <Typography variant="h6" sx={{display: {xs: 'none', sm: 'block'}}}>
                {user && user.Name}
            </Typography>

            <Typography variant="body" sx={{
                color: '#bbb',
                lineHeight: '1.75em',
                fontSize: '14px',
                textShadow: '1px 1px 2px rgb(0 0 0 / 37%)'
            }}>
                {user && user.Moto}
            </Typography>
            <StyledTypography>
                <RoomOutlinedIcon fontSize="small"/>shanghai, china
            </StyledTypography>

            <AvatarModal title="修改头像"
                         maxWidth="sm"
                         open={openModal}
                         handleClose={() => {
                             setOpenModal(false);
                             setAvatarUri(user.Avatar)
                         }}
                         handleSave={changeAvatar}
            >

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Avatar alt="elle"
                            src={avatarUri}
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
                    {
                        defaultAvatars.map((link, index) =>
                            (<img alt="default_avatar"
                                 style={{width: '55px', height: '55px', marginRight: '10px', borderRadius: '50%'}}
                                 src={link}
                                  onClick={() => setAvatarUri(link)}
                                />
                            ))
                    }
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>
                    <DragAndDrop handleDropFile={handleDrop}>
                        <input type="file"
                               name="avatar"
                               ref={fileRef}
                               onChange={onAvatarChange}
                               style={{display: 'none',}}/>
                        <IconButton onClick={() => fileRef.current.click()}
                                    sx={{
                                        width: '200px',
                                        height: '50px',
                                        borderRadius: '5px',
                                        backgroundColor: alpha('#252422', 0.3),
                                        '&:hover': {
                                            backgroundColor: alpha('#252422', 0.1)
                                        }
                                    }}
                        >
                            <span style={{fontSize: '16px', color: '#3399ff'}}>+ 上传图片</span>
                        </IconButton>

                    </DragAndDrop>


                </div>
            </AvatarModal>
        </Box>
    );
}

export default UserInfo;