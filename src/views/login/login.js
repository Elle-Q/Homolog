import React, {useRef, useState} from 'react';
import useWindowDimensions from "../../hook/useWindowDimensions";
import Box from "@mui/material/Box";
import {alpha} from "@mui/system";
import loginBg from '../../assets/bg/login04.jpg'
import wechat from '../../assets/temp/wechat.jpg'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginOtherWay from "../../features/login/LoginOtherWay";
import {useNavigate} from 'react-router-dom';
import InputWithIcon from "../../features/login/InputWithIcon";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import {Link} from "@mui/material";
import {login} from "../../api/auth.service";
import {logout, selectAuth} from "../../api/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectAlert} from "../../features/alert/alertSlice";

function Login(props) {
    const {height, width} = useWindowDimensions();
    const [action, setAction] = useState('signin');//register
    const [type, setType] = useState('name');
    const navigate = useNavigate();
    const phoneRef = React.createRef();
    const passRef = React.createRef();
    const dispatch = useDispatch();
    const {isLogin} = useSelector(selectAuth);

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
        dispatch(login(phoneRef.current.value, passRef.current.value))
        if (isLogin) {
            navigate('/app');
        }
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
            backgroundImage: `url(${loginBg})`,
            backgroundSize: "cover",
        }}>
            <Box sx={{
                position: "absolute",
                left: '3%',
                top: '10%',
                padding: '20px 50px 30px 50px',
                backgroundColor: alpha('#36393f', 0.7),
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
                                    <InputWithIcon placeholder="输入昵称..." icon={<PersonIcon fontSize="medium"/>}/>
                                    <InputWithIcon placeholder="输入手机号..." icon={<PhoneIphoneIcon fontSize="medium"/>}/>
                                    <InputWithIcon placeholder="输入短信验证码..." type="verify"
                                                   icon={<ShieldIcon fontSize="medium"/>}/>
                                    <InputWithIcon placeholder="输入密码..." type="password"
                                                   icon={<VpnKeyIcon fontSize="medium"/>}/>
                                </React.Fragment>
                        }

                        <div style={{ margin: "40px 40px" }}>
                            {
                                action === 'signin' ?
                                    '没有账号? '  : '已有账号 '
                            }
                            <Link color="#3399FF" onClick={toggleAction} sx={{cursor:"pointer"}}>{
                                action === 'signin' ?
                                    ' 注册'  : ' 登录'
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