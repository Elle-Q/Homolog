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

function AvatarEditModal(props) {
    const {open, handleClose,defaultAvatars, } = props;
    const {user} = useSelector(selectAuth);

    const [avatarUri, setAvatarUri] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const dispatch = useDispatch();
    const fileRef = createRef();

    useEffect(() => {
        user && setAvatarUri(user.Avatar)
    }, [user])

    useEffect(() => {
        avatarFile && setAvatarUri(URL.createObjectURL(avatarFile));
    }, [avatarFile])


    //点击任意默认头像, 设置头像预览
    const defaultAvatarClick = (link) => {
        return (e) => {
            e.stopPropagation()
            setAvatarUri(link)
            setAvatarFile(null)
        }
    }

    //上传本地文件(点击), 预览
    const onAvatarChange = (event) => {
        if (event.target.type === 'file') {
            setAvatarFile(event.target.files[0]);
        }
    }

    //上传本地文件(拖拽), 预览
    const handleDrop = (files) => {
        setAvatarFile(files[0])
    }

    //修改头像(上传七牛, 更新数据库)
    function changeAvatar() {

        if (!avatarFile) {
            dispatch(updateAvatar(user.ID, avatarUri))
            handleClose()
        } else {
            upload(avatarFile).then((link) => {
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
                     handleSave={changeAvatar}
        >

            <div style={{display: "flex", justifyContent: "center"}}>
                <Avatar alt="elle"
                        src={avatarUri}
                        sx={{
                            width: 120,
                            height: 120,
                            position: "absolute",
                            boxShadow: '0 0 5px #403D39',
                            cursor: "pointer"
                        }}
                />
            </div>

            <div style={{display: "flex", justifyContent: "center", marginTop: '150px'}}>
                {
                    defaultAvatars.map((link, index) =>
                        (<img
                                key={index}
                                alt="default_avatar"
                                style={{
                                    width: '55px',
                                    height: '55px',
                                    marginRight: '10px',
                                    borderRadius: '50%',
                                    cursor:'pointer'
                                    // transform: `${hovered && 'scale(1.5,1.5)'}`,
                                }}
                                src={link}
                                onClick={defaultAvatarClick(link)}
                            />
                        ))
                }
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>
                <DragDrop handleDropFile={handleDrop}>
                    <input type="file"
                           name="avatar"
                           ref={fileRef}
                           onChange={onAvatarChange}
                           style={{display: 'none',}}/>
                    <IconButton onClick={() => fileRef.current.click()}
                                sx={{
                                    width: '200px',
                                    height: '50px',
                                    borderRadius: '5px',
                                    backgroundColor: alpha('#252422', 0.3),
                                    '&:hover': {
                                        backgroundColor: alpha('#252422', 0.1)
                                    }
                                }}
                    >
                        <span style={{fontSize: '16px', color: '#3399ff'}}>+ 上传图片</span>
                    </IconButton>
                </DragDrop>

            </div>
        </AvatarModal>
    )
}

export default AvatarEditModal;