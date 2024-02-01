import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {alpha} from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useNavigate} from 'react-router-dom';
import InputWithIcon from "../../components/icon-input/InputWithIcon";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import {Link} from "@mui/material";
import {login, signup} from "../../api/user.service";
import {useDispatch} from "react-redux";
import './login.scss'
import Timer from "./timer/timer";
import styled from "styled-components";
import {SendSmsCode} from "../../api/sms.service";
import {isPhone, varifyPsw} from "../../utils/VarifyUtil";
import Agreement from "./agreement/agreement";

const SignButton = styled(Button)({
    backgroundColor: "rgba(92,96,253,0.62)",
    color: '#dcddde',
    fontSize: '18px',
    width: '100%',
    height: `50px`,
    border: "none",
    '&:hover': {
        backgroundColor: alpha("#5C60FD9E", 0.6),
    }
})


function Login(props) {
    const [action, setAction] = useState('signin');//register
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userNameRef = React.createRef();
    const phoneRef = React.createRef();
    const passRef = React.createRef();
    const codeRef = React.createRef();
    const [message, setMessage] = useState("")
    const [agree, setAgree] = useState(false)

    const handleLogin = async () => {
        if (!agree) {
            alert("请先同意用户协议!")
            return
        }
        if (action === 'signin') { //登录
            dispatch(login(phone, password)).then((hasLogin) => {
                if (hasLogin) navigate('/');//跳转到首页
            })
        } else { // 注册
            dispatch(
                signup(
                    userNameRef.current.value,
                    phoneRef.current.value,
                    passRef.current.value,
                    codeRef.current.value,
                ));
            setPhone(phoneRef.current.value);
            setPassword(passRef.current.value);
            toggleAction()
        }
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
        phoneVerify(event)
        setPhone(event.target.value)
    }

    const handlePswChange = (event) => {
        pswVerify(event)
        setPassword(event.target.value)
    }

    return (
        <div id="bgBody">
            <Box sx={{
                padding: '20px 20px 30px 20px',
                backgroundColor: 'rgba(28,28,28,0.9)',
                borderRadius: '10px',
                boxShadow: '0 0 8px #36393f',
            }}>
                <Typography variant="h4" align="center" color='#fff' sx={{fontFamily: 'cursive'}}>
                    {
                        action === 'signin' ? '欢迎回来' : '注册账号'
                    }
                </Typography>

                <Stack sx={{mt: '5px'}}>
                    {
                        action === 'signin' ?
                            <React.Fragment>
                                <InputWithIcon placeholder="输入手机号"
                                               onChange={handlePhoneChange}
                                               value={phone}
                                               icon={<PhoneIphoneIcon fontSize="small"/>}/>
                                <InputWithIcon placeholder="输入密码"
                                               type="password"
                                               value={password}
                                               onChange={handlePswChange}
                                               icon={<VpnKeyIcon fontSize="small"/>}/>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <InputWithIcon ref={userNameRef} placeholder="输入昵称"
                                               icon={<PersonIcon fontSize="small"/>}/>
                                <InputWithIcon ref={phoneRef} placeholder="输入手机号"
                                               onChange={phoneVerify}
                                               icon={<PhoneIphoneIcon fontSize="small"/>}/>
                                <InputWithIcon ref={codeRef} placeholder="输入短信验证码" type="verify"
                                               icon={<ShieldIcon fontSize="small"/>}>
                                    <Timer handleClickSend={handleClickSendSms}></Timer>
                                </InputWithIcon>
                                <InputWithIcon ref={passRef} placeholder="输入密码" type="password"
                                               onChange={pswVerify}
                                               icon={<VpnKeyIcon fontSize="small"/>}/>
                            </React.Fragment>
                    }
                    <label style={{color: 'red', marginLeft: '40px', fontSize: '14px'}}>{message}</label>
                    <div style={{margin: "10px 0 10px 40px", color: '#6e6d6d', fontSize: "14px"}}>
                        {action === 'signin' ? '没有账号? ' : '已有账号 '}
                        <Link color="#3399FF" onClick={toggleAction} sx={{cursor: "pointer", fontSize: "16px"}}>
                            {action === 'signin' ? ' 注册' : ' 登录'}
                        </Link>
                    </div>
                    <Agreement handleAgree={() => setAgree(!agree)} agree={agree}/>
                    <SignButton onClick={handleLogin}>
                        {
                            action === 'signin' ? '登录' : '注册'
                        }
                    </SignButton>
                </Stack>

            </Box>

        </div>
    );
}

export default Login;