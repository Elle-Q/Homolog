import React from 'react';
import Box from "@mui/material/Box";
import InputWithIcon from "./InputWithIcon";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ShieldIcon from "@mui/icons-material/Shield";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function RegisterAction(props) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent:"center"
        }}>
            <InputWithIcon placeholder="输入昵称..." icon={<PersonIcon fontSize="medium"/>}/>
            <InputWithIcon placeholder="输入手机号..." icon={<PhoneIphoneIcon fontSize="medium"/>}/>
            <InputWithIcon placeholder="输入短信验证码..." type="verify" icon={<ShieldIcon fontSize="medium"/>}/>
            <InputWithIcon placeholder="输入密码..." icon={<VpnKeyIcon fontSize="medium"/>}/>
        </Box>
    );
}

export default RegisterAction;