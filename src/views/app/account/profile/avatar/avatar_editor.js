import React, {createRef, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import DragDrop from "../../../../../components/DragDrop";
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/material/styles";
import {Modal as AvatarModal} from "../../../../../components/Modal";
import UserService from "../../../../../api/user.service";
import {upload} from "../../../../../api/qiniu.service";

function Avatar_editor(props) {
    const {open, handleClose, handleOk, defaultAvatars} = props;
    const [avatarUri, setAvatarUri] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const fileRef = createRef();

    useEffect(() => {
        let user = UserService.getLocalUser();
        setAvatarUri(user.avatar)
    }, [])

    useEffect(() => {
        avatarFile && setAvatarUri(URL.createObjectURL(avatarFile));
    }, [avatarFile])


    //点击任意默认头像, 设置头像预览
    const defaultAvatarClick = (link) => {
        return (e) => {
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

    const handleUploadAvatar = (event) => {
        fileRef.current.click()
    }

    //修改头像
    function changeAvatar() {
        handleOk(avatarUri)
        if (!avatarFile) {
            UserService.changeAvatar(avatarUri).then(
                () => {
                    handleClose()
                }
            )

        } else {
            upload(avatarFile).then((link) => {
                UserService.changeAvatar(avatarUri).then(
                    () => {
                        handleClose()
                    }
                )
            })
        }
    }

    return (
        <AvatarModal title="修改头像"
                     maxWidth="md"
                     open={open}
                     handleClose={handleClose}
                     handleCancel={handleClose}
                     handleOK={changeAvatar}
        >

            <div style={{display: "flex", justifyContent: "center"}}>
                <Avatar alt="avatar"
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
                                    cursor: 'pointer'
                                }}
                                src={link}
                                onClick={defaultAvatarClick(link)}
                            />
                        ))
                }
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: '20px'}}>
                <DragDrop
                    handleDropFile={handleDrop}
                    width="200px"
                    height="50px"
                    color="#3399ff"
                >
                    <input type="file"
                           name="avatar"
                           ref={fileRef}
                           onChange={onAvatarChange}
                           style={{display: 'none',}}/>
                    <IconButton onClick={handleUploadAvatar}
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

export default Avatar_editor;