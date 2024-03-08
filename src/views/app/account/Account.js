import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import TabBar from "./tab/TabBar";
import BgModal from "./profile/bg/bg-modal";
import UserService from "../../../api/user.service";
import Profile from "./profile/profile";
import {getCurrentEffect} from "../../../api/config.service";

function Account(props) {

    const [openBgModal, setOpenBgModal] = useState(false);
    const [bgUri, setBgUri] = useState(null);
    const [user, setUser] = useState({})

    useEffect(() => {
        UserService.getUser().then(resp=> {
            setUser(resp)
        })
    }, [])

    useEffect(() => {
        user && setBgUri(user.bgImg)
    }, [user])

    //点击背景获取默认背景集合
    const onClickBG = (e) => {
        setOpenBgModal(true)
    }

    const handleClose = () => {
        setOpenBgModal(false);
    };

    const closeModal = () => {
        setOpenBgModal(false);
    };

    const changeBG = (bg) => {
        setBgUri(bg);
    };

    return (
        <div style={{backgroundColor: '#111'}}>
            <Box
                sx={{
                    display: "flex",
                    height: '600px',
                    justifyContent: "center",
                    alignItems: "end",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${bgUri})`,
                    opacity: 1,
                    '&:hover': {
                        opacity: 0.8,
                        transition: 'opacity 200ms ease-in ',
                        cursor: 'pointer',
                    },
                }}
                onClick={onClickBG}
            >
                <Profile />
            </Box>

            {/*修改背景图像*/}
            <BgModal
                open={openBgModal}
                handleClose={handleClose}
                previewBG={changeBG}
                closeModal={closeModal}
            />
            <TabBar/>
        </div>
    );
}

export default Account;