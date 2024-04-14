import React, {createRef, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import DragDrop from "../../../../components/drag-drop/DragDrop";
import {Modal} from "../../../../components/modal/modal";
import UserService from "../../../../api/user.service";
import {FlexCenter} from "../../../../components/center/center";
import "../account.scss"

function AvatarModal(props) {
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
        if (!avatarFile) {
            UserService.changeAvatar(avatarUri).then(
                () => {
                    handleClose()
                }
            )
        } else {
            UserService.uploadAvatar(avatarFile).then((link) => {
                handleClose()
                setAvatarUri(link)
            })
        }
        handleOk(avatarUri)
    }

    return (
        <Modal maxWidth="md"
               open={open}
               handleClose={handleClose}
               handleCancel={handleClose}
               handleOK={changeAvatar}
        >
            <FlexCenter>
                <Avatar alt="avatar"
                        className="avatar-modal__avatar"
                        src={avatarUri}/>
            </FlexCenter>

            <FlexCenter className="mt-3">
                {
                    defaultAvatars.map((link, index) =>
                        (<img
                                key={index}
                                className="avatar-modal__avatar--small"
                                alt="avatar-modal__avatar--small"
                                src={link}
                                onClick={defaultAvatarClick(link)}
                            />
                        ))
                }
            </FlexCenter>
            <FlexCenter className="mt-3">
                <DragDrop
                    handleDropFile={handleDrop}
                    width="200px"
                    height="50px"
                >
                    <input type="file"
                           name="avatar"
                           ref={fileRef}
                           onChange={onAvatarChange}
                           className="avatar-modal__drop-input"/>
                    <button onClick={handleUploadAvatar} className="avatar-modal__drop-btn">
                        <span>+ 上传图片</span>
                    </button>
                </DragDrop>
            </FlexCenter>
        </Modal>
    )
}

export default AvatarModal;