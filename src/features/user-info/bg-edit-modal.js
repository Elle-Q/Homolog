import React, {createRef, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import DragDrop from "../../common/drag-drop";
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/material/styles";
import {default as AvatarModal} from "../../common/modal";
import {updateAvatar, updateBG} from "../../api/user.service";
import {upload} from "../../api/qiniu.service";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../api/authSlice";
import Stack from "@mui/material/Stack";
import {ImageList} from "@mui/material";
import {getDefaultBG} from "../../api/config.service";
import {light} from "@mui/material/styles/createPalette";

function BGEditModal(props) {
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
        dispatch(updateBG(user.ID, bgUri))
        closeModal()
    }

    return (
        <AvatarModal
                     maxWidth="md"
                     open={open}
                     handleClose={handleClose}
                     handleSave={changeBG}
        >
            <ImageList cols={3} rowHeight={164}>
                {
                    defaultBGs.map((link, index) =>
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

export default BGEditModal;