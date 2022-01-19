import React, {useState} from 'react';
import Box from "@mui/material/Box";
import UserInfo from "../../features/user-info/user-info";
import TabBar from "../../common/tab-bar";
import { useSelector} from "react-redux";
import {selectAuth } from "../../api/authSlice";
import BGEditModal from "../../features/user-info/bg-edit-modal";
import {getDefaultBG} from "../../api/config.service";

function Account(props) {

    const {user} = useSelector(selectAuth);
    const [openModal, setOpenModal] = useState(false);
    const [defaultBGs, setDefaultBGs] = useState([]);

    //点击头像获取默认头像集合
    const onClickBG = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        setOpenModal(true)
        //获取默认头像
        getDefaultBG().then(resp => {
            setDefaultBGs(resp)
        })
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div style={{backgroundColor: '#111'}}>
            <Box
                sx={{
                    display: "flex",
                    height: '600px',
                    justifyContent: "center",
                    alignItems: "end",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${user && user.BgImag})`,
                    opacity: 1,
                    '&:hover': {
                        opacity: 0.8,
                        transition: 'opacity 200ms ease-in ',
                        cursor: 'pointer',
                    },
                }}
                onClick={onClickBG}
            >
                <UserInfo/>
            </Box>

            {/*修改背景图像*/}
            <BGEditModal
                open={openModal}
                user={user}
                handleClose={handleClose}
                defaultBGs={defaultBGs}
            />
            <TabBar/>
        </div>
    );
}

export default Account;