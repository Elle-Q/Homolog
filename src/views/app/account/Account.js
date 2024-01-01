import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Profile from "./profile/Profile";
import TabBar from "./tab/TabBar";
import { useSelector} from "react-redux";
import {selectAuth } from "../../../api/authSlice";
import BgEditModal from "./profile/BgEditModal";

function Account(props) {

    const {user} = useSelector(selectAuth);
    const [openModal, setOpenModal] = useState(false);
    const [defaultBGs, setDefaultBGs] = useState([]);
    const [bgUri, setBgUri] = useState(null);


    useEffect(() => {
        user && setBgUri(user.bgImg)
    }, [user])

    //点击背景获取默认背景集合
    const onClickBG = (e) => {
        e.stopPropagation()
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false);
        setBgUri(user.bgImg)
    };

    const closeModal = () => {
        setOpenModal(false);
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
                <Profile/>
            </Box>

            {/*修改背景图像*/}
            <BgEditModal
                open={openModal}
                user={user}
                handleClose={handleClose}
                defaultBGs={defaultBGs}
                previewBG={changeBG}
                closeModal={closeModal}
            />
            <TabBar/>
        </div>
    );
}

export default Account;