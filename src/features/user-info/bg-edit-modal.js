import React, {createRef, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import DragDrop from "../../common/drag-drop";
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/material/styles";
import {default as AvatarModal} from "../../common/modal";
import {updateAvatar} from "../../api/user.service";
import {upload} from "../../api/qiniu.service";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../api/authSlice";

function BGEditModal(props) {
    const {open, user, handleClose,defaultBGs} = props;

    const [bgUri, setBGUri] = useState(null);
    const [bgFile, setBGFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        bgFile && setBGUri(URL.createObjectURL(bgFile));
    }, [bgFile])


    //点击任意默认头像, 设置头像预览
    const defaultBGClick = (link) => {
        return () => {
            setBGUri(link)
            setBGFile(null)
        }
    }

    //修改头像(上传七牛, 更新数据库)
    function changeBG() {
        if (!bgFile) {
            dispatch(updateAvatar(user.ID, bgUri))
            handleClose()
        } else {
            upload(bgFile).then((link) => {
                dispatch(updateAvatar(user.ID, link))
                handleClose()
            })
        }

    }

    return (
        <AvatarModal title="修改头像"
                     maxWidth="sm"
                     open={open}
                     handleClose={handleClose}
                     handleSave={changeBG}
        >
            {/*<div style={{display: "flex", justifyContent: "center", marginTop: '150px'}}>*/}
                {
                    defaultBGs.map((link, index) =>
                        (<img
                                key={index}
                                alt="default_avatar"
                                style={{
                                    width: '250px',
                                    // height: '50px',
                                    marginRight: '10px',
                                    borderRadius: '10px',
                                    cursor:'pointer'
                                    // transform: `${hovered && 'scale(1.5,1.5)'}`,
                                }}
                                src={link}
                                onClick={defaultBGClick(link)}
                            />
                        ))
                }
            {/*</div>*/}
        </AvatarModal>
    )
}

export default BGEditModal;