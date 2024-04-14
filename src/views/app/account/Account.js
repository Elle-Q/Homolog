import React, {useEffect, useState} from 'react';
import TabBar from "./tab/tab";
import BgModal from "./bg-modal/bg-modal";
import UserService from "../../../api/user.service";
import Profile from "./profile/profile";
import "./account.scss"

function Account(props) {

    const [openBgModal, setOpenBgModal] = useState(false);
    const [bgUri, setBgUri] = useState(null);
    const [user, setUser] = useState({})

    useEffect(() => {
        UserService.getUser().then(resp=> {
            setUser(resp)
        })
    }, [])

    useEffect(() => {
        user && setBgUri(user.bgImg)
    }, [user])

    //点击背景获取默认背景集合
    const onClickBG = (e) => {
        setOpenBgModal(true)
    }

    const handleClose = () => {
        setOpenBgModal(false);
    };

    const closeModal = () => {
        setOpenBgModal(false);
    };

    const changeBG = (bg) => {
        setBgUri(bg);
    };

    return (
        <div>
            <div className="section-profile"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${bgUri})`,}}
                onClick={onClickBG}
            >
                <Profile />
            </div>

            {/*修改背景图像*/}
            <BgModal
                open={openBgModal}
                handleClose={handleClose}
                previewBG={changeBG}
                closeModal={closeModal}
            />
            <TabBar/>
        </div>
    );
}

export default Account;