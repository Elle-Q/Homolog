import React, {useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from "../../../../api/auth.service";
import {getCurrentEffect, getDefaultAvatar} from "../../../../api/config.service";
import UserDrawer from "../user-drawer/user-drawer";
import AvatarModal from "../avatar-modal/avatar_modal";
import UserService from "../../../../api/user.service";
import '../account.scss'
import {ActionButton} from "../../../../components/button/icon-button";

function Profile(props) {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [avatarUri, setAvatarUri] = useState(null);
    const [defaultAvatars, setDefaultAvatars] = useState([]);
    const [effects, setEffects] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        let localUser = UserService.getLocalUser()
        setUser(localUser)
        setAvatarUri(localUser.avatar)

        getCurrentEffect().then(resp => {
            setEffects(resp)
        })
    }, [])

    //打开侧边栏用户详情信息
    const toggleDrawer = open => (e) => {
        e.stopPropagation()
        setDrawerOpen(open)
    }

    //注销账号
    const logout = async (e) => {
        e.stopPropagation()
        AuthService.logout()
    }

    //toggle头像编辑框
    const handleClose = (e) => {
        setOpenModal(false);
    };

    //点击头像获取默认头像集合
    const onClickAvatar = (e) => {
        setOpenModal(true)
        e.stopPropagation()
        //获取默认头像
        getDefaultAvatar().then(resp => {
            setDefaultAvatars(resp)
        })
    }

    //带有编辑和注销按钮的头像结合体!(结合体! 哈哈`)
    const AvatarWithEdit = () => {
        return (
            <div style={{marginBottom: '100px', position: 'relative'}}
                 onClick={onClickAvatar}>
                <Avatar alt="avatar"
                        src={avatarUri}
                        sx={{
                            width: 120,
                            height: 120,
                            position: "absolute",
                            border: '8px solid #252422',
                            boxShadow: '0 0 5px #403D39',
                            cursor: "pointer"
                        }}
                />
                {
                    effects.frame_effect &&
                    <div className="profile__avatar--mask">
                        <img alt="loop" src={effects.frame_effect}/>
                    </div>
                }

                <ActionButton icon={<EditIcon sx={{color: "white"}} fontSize="large"/>}
                              name="edit"
                              onClick={toggleDrawer(true)}/>
                <ActionButton icon={<LogoutIcon sx={{color: "white"}} fontSize="large"/>}
                              name="logout"
                              onClick={logout}/>
            </div>
        )
    }

    return (
        <div className="profile">
            <AvatarWithEdit/>
            <UserDrawer
                toggleDrawer={toggleDrawer}
                open={drawerOpen}
                user={user}
            />

            <h1 className="profile__name"> {user && user.name} </h1>

            <h2 className="profile__info">
                {user && user.moto}
            </h2>

            <h2 className="profile__info">
                <RoomOutlinedIcon fontSize="small"/> {user && user.address}
            </h2>

            <AvatarModal
                user={user}
                open={openModal}
                handleClose={handleClose}
                handleOk={(link) => setAvatarUri(link)}
                defaultAvatars={defaultAvatars}
            />

        </div>
    );
}

export default Profile;