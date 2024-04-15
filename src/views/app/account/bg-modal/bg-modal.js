import React, {useEffect, useState} from "react";
import {Modal} from "../../../../components/modal/modal";
import UserService from "../../../../api/user.service";
import {ImageList} from "@mui/material";
import {getDefaultBG} from "../../../../api/config.service";

function BgModal(props) {
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

    //更新数据库
    function changeBG() {
        UserService.changeBG(bgUri).then(() => closeModal())
    }

    return (
        <Modal
            maxWidth="md"
            open={open}
            handleClose={handleClose}
            handleCancel={handleClose}
            handleOK={changeBG}
        >
            <ImageList cols={3} rowHeight={164}>
                {
                    defaultBGs && defaultBGs.map((link, index) =>
                        (
                            <img
                                key={index}
                                alt="default_avatar"
                                className="bg-modal__img"
                                src={link}
                                onClick={defaultBGClick(link)}
                            />
                        ))
                }
            </ImageList>
        </Modal>
    )
}

export default BgModal;