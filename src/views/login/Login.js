import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {alpha} from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useNavigate} from 'react-router-dom';
import InputWithIcon from "./InputWithIcon";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import {Link} from "@mui/material";
import {login, signup} from "../../api/user.service";
import {useDispatch} from "react-redux";
import './login.css'
import TimerButton from "./TimerButton";
import styled from "styled-components";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userNameRef = React.createRef();
    const phoneRef = React.createRef();
    const passRef = React.createRef();
    const codeRef = React.createRef();

    const handleLogin = async () => {
        if (action === 'signin') { //登录
            dispatch(login(
                    phoneRef.current.value,
                    passRef.current.value
                )).then(() => {
                navigate('/app'); //跳转到首页
            })
        } else { // 注册
            dispatch(
                signup(
                    userNameRef.current.value,
                    phoneRef.current.value,
                    passRef.current.value,
                    codeRef.current.value,
                ))
        }
    }

    //todo: 验证手机号， 发送短信获取短信验证码
    const onMSCodeClick = () => {
        codeRef.current.value = '1122'
    }

    function toggleAction() {
        if (action === 'signin') {
            setAction("signup")
        } else {
            setAction("signin")
        }
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
                                <InputWithIcon ref={phoneRef} placeholder="输入手机号" icon={<PhoneIphoneIcon fontSize="small"/>}/>
                                <InputWithIcon ref={passRef} placeholder="输入密码" type="password" icon={<VpnKeyIcon fontSize="small"/>}/>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <InputWithIcon ref={userNameRef} placeholder="输入昵称" icon={<PersonIcon fontSize="small"/>}/>
                                <InputWithIcon ref={phoneRef} placeholder="输入手机号" icon={<PhoneIphoneIcon fontSize="small"/>}/>
                                <InputWithIcon ref={codeRef} placeholder="输入短信验证码" type="verify" icon={<ShieldIcon fontSize="small"/>}>
                                    <TimerButton sendMSCode={onMSCodeClick}></TimerButton>
                                </InputWithIcon>
                                <InputWithIcon ref={passRef} placeholder="输入密码" type="password" icon={<VpnKeyIcon fontSize="small"/>}/>
                            </React.Fragment>
                    }

                    <div style={{margin: "10px 0 10px 40px", color: '#6e6d6d', fontSize: "14px"}}>
                        {action === 'signin' ? '没有账号? ' : '已有账号 '}
                        <Link color="#3399FF" onClick={toggleAction} sx={{cursor: "pointer", fontSize: "16px"}}>
                            {action === 'signin' ? ' 注册' : ' 登录'}
                        </Link>
                    </div>

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