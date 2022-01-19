import React, {useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {alpha, styled} from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';
import {authService} from "../../api/auth.service";
import {useSelector} from "react-redux";
import {selectAuth} from "../../api/authSlice";
import {getDefaultAvatar} from "../../api/config.service";
import UserDrawer from "./user-drawer";
import AvatarEditModal from "./avatar-edit-modal";

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

    const { user} = useSelector(selectAuth);
    const [drawerOpen, setDrawerOpen] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [avatarUri, setAvatarUri] = useState(null);
    const [defaultAvatars, setDefaultAvatars] = useState([]);


    useEffect(() => {
        user && setAvatarUri(user.Avatar)
    }, [user])

    const toggleDrawer = open => () => {
        setDrawerOpen(open)
    }

    //注销账号
    const logout = async () => {
        authService.logout()
    }

    const handleClose = (e) => {
        e.stopPropagation()
        setOpenModal(false);
    };

    //点击头像获取默认头像集合
    const onClickAvatar = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation()
        setOpenModal(true)
        //获取默认头像
        getDefaultAvatar().then(resp => {
            setDefaultAvatars(resp)
        })

    }

    //带有编辑和注销按钮的头像结合体!(结合体! 哈哈`)
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


    return (
        <Box sx={{mb: '20px', textAlign: "center" }}>
            <AvatarWithEdit/>
            <UserDrawer
                user={user}
                toggleDrawer={toggleDrawer}
                open={drawerOpen}
            />

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

            <AvatarEditModal
                user={user}
                open={openModal}
                handleClose={handleClose}
                defaultAvatars={defaultAvatars}
            />

        </Box>
    );
}

export default UserInfo;