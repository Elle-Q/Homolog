import React, {useEffect, useState} from "react";
import {Modal as AvatarModal} from "../../../../components/Modal";
import UserService from "../../../../api/user.service";
import {ImageList} from "@mui/material";
import {getDefaultBG} from "../../../../api/config.service";
import {useSelector} from "react-redux";

function BgEditModal(props) {
    const {open, handleClose, previewBG, closeModal} = props;

    const [bgUri, setBGUri] = useState(null);
    const [defaultBGs, setDefaultBGs] = useState([]);

    useEffect(() => {
        //获取默认背景
        getDefaultBG().then(resp => {
            setDefaultBGs(resp)
        })
    }, [])

    //点击任意默认头像, 设置头像预览
    const defaultBGClick = (link) => {
        return (e) => {
            e.stopPropagation()
            previewBG(link)
            setBGUri(link)
        }
    }

    const handleCancel = (link) => {
        // previewBG(user.bgImg);
        handleClose()
    }

    //更新数据库
    function changeBG() {
        UserService.changeBG(bgUri).then(() => closeModal())
    }

    return (
        <AvatarModal
            maxWidth="md"
            open={open}
            handleClose={handleClose}
            handleCancel={handleCancel}
            handleOK={changeBG}
        >
            <ImageList cols={3} rowHeight={164}>
                {
                    defaultBGs && defaultBGs.map((link, index) =>
                        (
                            <img
                                key={index}
                                alt="default_avatar"
                                style={{
                                    width: '250px',
                                    marginRight: '10px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                }}
                                src={link}
                                onClick={defaultBGClick(link)}
                            />
                        ))
                }
            </ImageList>
        </AvatarModal>
    )
}

export default BgEditModal;