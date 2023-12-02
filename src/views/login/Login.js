import React, {useRef, useState} from 'react';
import useWindowDimensions from "../../hook/useWindowDimensions";
import Box from "@mui/material/Box";
import {alpha, rgbToHex} from "@mui/system";
import wechat from '../../assets/temp/wechat.jpg'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginOtherWay from "./LoginOtherWay";
import {useNavigate} from 'react-router-dom';
import InputWithIcon from "./InputWithIcon";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import {Link} from "@mui/material";
import {login, signup} from "../../api/auth.service";
import {useDispatch, useSelector} from "react-redux";
import BackGround from "./BackGround";

function Login(props) {
    const {height, width} = useWindowDimensions();
    const [action, setAction] = useState('signin');//register
    const [type, setType] = useState('name');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userNameRef = React.createRef();
    const phoneRef = React.createRef();
    const passRef = React.createRef();
    const codeRef = React.createRef();

    const getPlaceHolder = () => {
        switch (type) {
            case 'phone' :
                return '输入手机号...'
            case 'email' :
                return '输入注册邮箱...'
            case 'name' :
                return '输入用户名...'
        }
    }

    const handleLogin = async () => {
        if (action === 'signin') { //登录
            dispatch(
                login(
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
        <div style={{
            height: height,
            width: width,
            backgroundColor:'#181818',
            overflowX: 'hidden',
            // backgroundImage: `url(${loginBg})`,
            // backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${loginBg})`,
            // backgroundSize: "cover",
        }}>

            <BackGround />
            <Box sx={{
                position: "absolute",
                right: '3%',
                top: '10%',
                padding: '20px 50px 30px 50px',
                backgroundColor: alpha('#36393f', 0.3),
                borderRadius: '8px',
                boxShadow: '0 0 5px #36393f',

            }}>
                <Typography variant="h4" align="center" color='#fff' sx={{fontFamily: '-apple-system',}}>
                    {
                        action === 'signin' ? '登录' : '注册账号'
                    }
                </Typography>

                <Stack direction='row' spacing={6} sx={{mt: '10px'}}>
                    <Box>
                        <img style={{
                            width: '300px',
                            height: '300px',
                            borderRadius: '8px',
                            marginTop: '30px',
                        }} alt="wechat" title="wechat" src={wechat}/>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: 'column',
                        justifyContent: "center"
                    }}>
                        {
                            action === 'signin' ?
                                <React.Fragment>
                                    <InputWithIcon ref={phoneRef} placeholder={getPlaceHolder()}
                                                   icon={<PhoneIphoneIcon fontSize="medium"/>}/>
                                    <InputWithIcon ref={passRef} placeholder="输入密码..." type="password"
                                                   icon={<VpnKeyIcon fontSize="medium"/>}/>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <InputWithIcon ref={userNameRef} placeholder="输入昵称..." icon={<PersonIcon fontSize="medium"/>}/>
                                    <InputWithIcon ref={phoneRef} placeholder="输入手机号..." icon={<PhoneIphoneIcon fontSize="medium"/>}/>
                                    <InputWithIcon ref={codeRef} placeholder="输入短信验证码..."
                                                   type="verify"
                                                   onMSCodeClick={onMSCodeClick}
                                                   icon={<ShieldIcon fontSize="medium"/>}/>
                                    <InputWithIcon ref={passRef} placeholder="输入密码..." type="password"
                                                   icon={<VpnKeyIcon fontSize="medium"/>}/>
                                </React.Fragment>
                        }

                        <div style={{margin: "40px 40px"}}>
                            {
                                action === 'signin' ?
                                    '没有账号? ' : '已有账号 '
                            }
                            <Link color="#3399FF" onClick={toggleAction} sx={{cursor: "pointer"}}>{
                                action === 'signin' ?
                                    ' 注册' : ' 登录'
                            }</Link>
                        </div>

                    </Box>


                </Stack>

                <LoginOtherWay/>
                <Button
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: "#3399ff",
                        color: '#fff',
                        fontSize: '18px',
                        width: '800px',
                        height: `50px`,
                        marginTop: '50px',
                        border: "none",
                        boxShadow: '0 0 3px #3399ff',
                        '&:hover': {
                            backgroundColor: alpha("#3399ff", 0.6),
                        }
                    }}
                >
                    {
                        action === 'signin' ? '登录' : '注册'
                    }
                </Button>
            </Box>

        </div>
    );
}

export default Login;