import React, {useEffect, useState} from "react";
import {default as AvatarModal} from "../../../../components/Modal";
import { updateBG} from "../../../../api/user.service";
import {useDispatch} from "react-redux";
import {ImageList} from "@mui/material";
import {getDefaultBG} from "../../../../api/config.service";

function BgEditModal(props) {
    const {open, user, handleClose, previewBG, closeModal} = props;

    const [bgUri, setBGUri] = useState(null);
    const dispatch = useDispatch();
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
        dispatch(updateBG(user.id, bgUri))
        closeModal()
    }

    return (
        <AvatarModal
                     maxWidth="md"
                     open={open}
                     handleClose={handleClose}
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