import React from 'react';
import useWindowDimensions from "../../hook/useWindowDimensions";
import Box from "@mui/material/Box";
import InputWithIcon from "../../features/login/InputWithIcon";
import {alpha} from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ShieldIcon from '@mui/icons-material/Shield';
import loginBg from '../../assets/bg/login03.jpg'
import wechat from '../../assets/temp/wechat.jpg'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Login(props) {
    const {height, width} = useWindowDimensions();
    return (
        <div style={{
            height: height,
            width: width,
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${loginBg})`,
            backgroundSize: "cover",
        }}>
            <Box sx={{
                position: "absolute",
                left: '3%',
                top: '10%',
                padding: '50px',
                // width:'500px',
                backgroundColor: alpha('#252422', 0.6),
                borderRadius: '8px',
                boxShadow: '0 0 5px #403D39',
            }}>
                <Stack direction='row' spacing={4}>
                    <Box>
                        <InputWithIcon placeholder="输入昵称..." icon={<PersonIcon fontSize="medium"/>}/>
                        <InputWithIcon placeholder="输入手机号..." icon={<PhoneIphoneIcon fontSize="medium"/>}/>
                        <InputWithIcon placeholder="输入短信验证码..." type="verify" icon={<ShieldIcon fontSize="medium"/>}/>
                        <InputWithIcon placeholder="输入密码..." icon={<VpnKeyIcon fontSize="medium"/>}/>
                    </Box>
                    <Box >
                        <img style={{
                            width: '300px',
                            height: '300px',
                            borderRadius: '8px',
                        }} alt="wechat" title="wechat" src={wechat}/>

                    </Box>
                </Stack>

                <Button sx={{
                    backgroundColor: "#3399ff",
                    color: 'white',
                    fontSize: '14px',
                    width:'800px',
                    marginTop:'50px'
                }}
                >登录</Button>
            </Box>

        </div>
    );
}

export default Login;