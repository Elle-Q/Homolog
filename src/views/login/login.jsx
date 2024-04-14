import React, {useState} from 'react';
import {alpha} from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useNavigate} from 'react-router-dom';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import {Link} from "@mui/material";
import UserService from "../../api/user.service";
import AuthService from "../../api/auth.service";
import {useDispatch} from "react-redux";
import './login.scss'
import Timer from "./timer/timer";
import styled from "styled-components";
import {SendSmsCode} from "../../api/sms.service";
import {isPhone, varifyPsw} from "../../utils/VarifyUtil";
import Agreement from "../../components/agreement/agreement";
import {loginFail, loginSuccess, registerSuccess} from "../../api/authSlice";
import WeChat from '../../assets/icons/wechat_login.svg'
import IconInput from "./icon-input/icon-input";

function Login(props) {
    const [action, setAction] = useState('signin');//register
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const userNameRef = React.createRef();
    const phoneRef = React.createRef();
    const passRef = React.createRef();
    const codeRef = React.createRef();
    const [message, setMessage] = useState("")
    const [agree, setAgree] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!agree) {
            alert("请先同意用户协议!")
            return
        }
        if (action === 'signin') { //登录
            AuthService.login(phone, password).then(
                resp => {
                    if (resp === null) {
                        dispatch(loginFail());
                    } else {
                        fetchUser()
                        dispatch(loginSuccess());
                    }
                }
            )
        } else { // 注册
            AuthService.signup(
                userNameRef.current.value,
                phoneRef.current.value,
                passRef.current.value,
                codeRef.current.value,).then(
                () => {
                    dispatch(registerSuccess())
                }
            )
            setPhone(phoneRef.current.value);
            setPassword(passRef.current.value);
            toggleAction()
        }
    }

    const handleWechatLogin = () => {
        if (!agree) {
            alert("请先同意用户协议!")
            return
        }
        AuthService.welogin().then(resp => {
            window.open(resp, '_self');
        })
    }

    const fetchUser = async () => {
        await UserService.getUser().then(() => {
            navigate('/');
        });
    }

    //todo: 验证手机号， 发送短信获取短信验证码
    const handleClickSendSms = () => {
        SendSmsCode(phoneRef.current.value).then(code => {
        })
    }

    function toggleAction() {
        if (action === 'signin') {
            setAction("signup")
        } else {
            setAction("signin")
        }
    }

    const phoneVerify = (event) => {
        let val = event.target.value;
        if (!isPhone(val)) {
            setMessage("手机号码格式不正确")
        } else {
            setMessage("")
        }
    }

    const pswVerify = (event) => {
        let val = event.target.value;
        if (!varifyPsw(val)) {
            setMessage("密码必须8位以上")
        } else {
            setMessage("")
        }
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }

    const handlePswChange = (event) => {
        pswVerify(event)
        setPassword(event.target.value)
    }

    return (
        <div className="login">
            <Stack className="login__box">
                <h1 className="heading-1">
                    {
                        action === 'signin' ? '欢迎回来' : '注册账号'
                    }
                </h1>
                {
                    action === 'signin' ?
                        <React.Fragment>
                            <IconInput placeholder="输入手机号"
                                       onChange={handlePhoneChange}
                                       value={phone}
                                       icon={<PhoneIphoneIcon fontSize="large"/>}/>
                            <IconInput placeholder="输入密码"
                                       type="password"
                                       value={password}
                                       onChange={handlePswChange}
                                       icon={<VpnKeyIcon fontSize="large"/>}/>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <IconInput ref={userNameRef} placeholder="输入昵称"
                                       icon={<PersonIcon fontSize="small"/>}/>
                            <IconInput ref={phoneRef} placeholder="输入手机号"
                                       onChange={phoneVerify}
                                       icon={<PhoneIphoneIcon fontSize="small"/>}/>
                            <IconInput ref={codeRef} placeholder="输入短信验证码" type="verify"
                                       icon={<ShieldIcon fontSize="small"/>}>
                                <Timer handleClickSend={handleClickSendSms}></Timer>
                            </IconInput>
                            <IconInput ref={passRef} placeholder="输入密码" type="password"
                                       onChange={pswVerify}
                                       icon={<VpnKeyIcon fontSize="small"/>}/>
                        </React.Fragment>
                }
                <label className="login__label--warning">{message}</label>
                <div className="login__label--notify">
                    {action === 'signin' ? '没有账号? ' : '已有账号 '}
                    <Link className="login__label--big" onClick={toggleAction}>
                        {action === 'signin' ? ' 注册' : ' 登录'}
                    </Link>
                </div>
                <div className="login__agree-box">
                    <Agreement handleAgree={() => setAgree(!agree)}
                               agree={agree}
                               label={'我已阅读并同意登录协议'}
                               type={'login_agreement'}/>
                </div>
                <button onClick={handleLogin} className="login__btn  login__btn--text">
                    {
                        action === 'signin' ? '登录' : '注册'
                    }
                </button>
                <button onClick={handleWechatLogin} className="login__btn login__btn--svg">
                    <img src={WeChat} alt="we_login"/>
                </button>
            </Stack>
        </div>
    );
}

export default Login;