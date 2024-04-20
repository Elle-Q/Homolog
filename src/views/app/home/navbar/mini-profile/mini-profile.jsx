import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './mini-profile.scss'
import Divider from "@mui/material/Divider";
import menuIcon from "../../../../../assets/icons/12/mouse.svg";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import IconButton from "@mui/material/IconButton";
import AvatarBadge from "../../../../../components/avatar-badge/avatar-badge";
import {getCurrentEffect} from "../../../../../api/config.service";
import AuthService from "../../../../../api/auth.service";

function MiniProfile(props) {

    const {user, show = false, handleClose} = props
    const navigate = useNavigate();
    const [effects, setEffects] = useState([])

    useEffect(() => {
        getCurrentEffect().then(resp => {
            setEffects(resp)
        })
        document.addEventListener('click', handleClose);
        return () => {
            document.removeEventListener('click', handleClose);
        };
    }, []);

    const enterAccount = (e) => {
        navigate('/account')
    };

    const handleLogout = () => {
        AuthService.logout()
    }

    return (
        <div hidden={!show} className="mini-profile fadedown" onMouseLeave={handleClose}>
            {
                user ? <React.Fragment>
                        {
                            effects && effects.bg_effect && effects.bg_effect.map((effect, index) => (
                                <div key={index} className="mini-profile--mask">
                                    <img alt="loop" src={effect}/>
                                </div>
                            ))
                        }
                        <div className="mini-profile__banner" style={{backgroundImage: `url(${user.bgImg})`}}></div>
                        <div className="mini-profile__avatar-box">
                            <div className="mini-profile__avatar">
                                <AvatarBadge user={user} size={{width: 10, height: 10}}/>
                            </div>
                            <div className="mini-profile__avatar--mask">
                                <img alt="loop" src={effects && effects.frame_effect}/>
                            </div>
                        </div>
                        <div className="mini-profile__icon-box">
                            <div className="mini-profile__icon-wrapper">
                                <IconButton className="mini-profile__icon">
                                    {
                                        user.gender === 'female' ?
                                            <FemaleIcon fontSize="small" sx={{color: 'white'}}/>
                                            : <MaleIcon fontSize="small" sx={{color: 'white'}}/>
                                    }
                                </IconButton>
                            </div>
                        </div>
                        <div className="mini-profile__nav">
                            <div className="mini-profile__nav-box">
                                <span style={{fontSize: '1.8rem'}}>{user.name}</span>
                                <span>{user.moto}</span>
                                <Divider/>
                                <li className="mini-profile__nav-link" onClick={enterAccount}>
                                    <img alt="icon" src={menuIcon}/>
                                    <span>个人主页</span>
                                </li>
                                <li className="mini-profile__nav-link" onClick={() => navigate("/order/open")}>
                                    <img alt="icon" src={menuIcon}/>
                                    <span>我的订单</span>
                                </li>
                            </div>
                        </div>
                        <li className="mini-profile__nav-link mini-profile__logout"
                            onClick={handleLogout}>
                            退出登录
                        </li>
                    </React.Fragment>
                    :
                    <div className="mini-profile__login-box">
                        去
                        <Link className="mini-profile__login-btn" to={`/login`}>
                            登录
                        </Link>
                    </div>
            }

        </div>
    );
}

export default MiniProfile;