import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './mini-profile.scss'
import Divider from "@mui/material/Divider";
import female from "../../../../../assets/icons/mouse.svg";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import IconButton from "@mui/material/IconButton";
import AvatarBadge from "../../../../../components/avatar-badge/avatar-badge";
import effectData from "../../../../../json/effects.json"
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CloseIcon from "@mui/icons-material/Close";

function MiniProfile(props) {

    const {user, show = false, handleClose} = props
    const navigate = useNavigate();
    const [effects, setEffects] = useState([])

    useEffect(() => {
        handleShuffle()
    }, []);

    const enterAccount = (e) => {
        navigate('/account')
    };

    const handleShuffle = () => {
        let randomNumber = Math.floor(Math.random() * effectData.length);
        let effect = effectData[randomNumber]
        let array = []
        for (let key in effect) {
            array.push(effect[key])
        }
        setEffects(array)
    }

    return (
        <div hidden={!show} className="mini-profile-container" onMouseLeave={handleClose}>
            <div className="float-button-container">
                <IconButton onClick={handleClose} className="icon-button" style={{backgroundColor: '#595DFD'}}>
                    <CloseIcon fontSize="medium" sx={{color: 'white'}}/>
                </IconButton>
                <IconButton onClick={handleShuffle} className="icon-button" style={{backgroundColor: '#9f9f9f'}}>
                    <ShuffleIcon fontSize="medium" sx={{color: 'white'}}/>
                </IconButton>
            </div>
            {
                effects.map((effect, index) => (
                    <div key={index} className="profile-mask">
                        <img alt="loop" src={effect}/>
                    </div>
                ))
            }
            <div className="mini-profile-banner"
                 style={{backgroundImage: `url(${user.bgImg})`, backgroundSize: '100% 100%'}}></div>
            <div className="mini-profile-avatar">
                <div className="avatar">
                    <AvatarBadge user={user} size={{width: 10, height: 10}}/>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                <div style={{padding: '5px 20px', backgroundColor: 'rgba(255,255,255,0.99)', borderRadius: '10px'}}>
                    <IconButton style={{backgroundColor: '#00a896', width: '25px', height: '25px'}}>
                        {
                            user.gender === 'female' ?
                                <FemaleIcon fontSize="small" sx={{color: 'white'}}/>
                                : <MaleIcon fontSize="small" sx={{color: 'white'}}/>
                        }
                    </IconButton>
                </div>
            </div>
            <div className="mini-profile-body">
                <div className="body">
                    <span style={{fontSize: '18px'}}>{user.name}</span>
                    <span>{user.moto}</span>
                    <Divider/>
                    <li className="link-li" onClick={enterAccount}>
                        <img alt="icon" src={female}/>
                        <span>个人主页</span>
                    </li>
                    <li className="link-li" onClick={() => navigate("/order/open")}>
                        <img alt="icon" src={female}/>
                        <span>我的订单</span>
                    </li>
                </div>
            </div>
            <li className="link-li"
                style={{display: 'flex', justifyContent: 'center', color: '#595DFD', padding: '10px'}}>退出登录
            </li>
        </div>
    );
}

export default MiniProfile;