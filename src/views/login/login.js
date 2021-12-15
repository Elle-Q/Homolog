import React, {useState} from 'react';
import useWindowDimensions from "../../hook/useWindowDimensions";
import Box from "@mui/material/Box";
import {alpha} from "@mui/system";
import loginBg from '../../assets/bg/login04.jpg'
import wechat from '../../assets/temp/wechat.jpg'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RegisterAction from "../../features/login/registerAction";
import LoginAction from "../../features/login/loginAction";
import LoginOtherWay from "../../features/login/LoginOtherWay";
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const {height, width} = useWindowDimensions();
    const [action, setAction] = useState('login');//register
    const [type, setType] = useState('name');
    const navigate = useNavigate();

    const renderInputs = () => {
        switch (action) {
            case 'login' :
                return (<LoginAction type={type}/>)
            case 'register' :
                return (<RegisterAction/>)
        }
    }

    const handleLogin = () => {
        navigate('/admin');
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
                        action === 'login' ? '登录' : '注册账号'
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

                    {renderInputs()}

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
                        action === 'login' ? '登录' : '注册'

                    }
                </Button>
            </Box>

        </div>
    );
}

export default Login;