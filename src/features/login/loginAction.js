import React from 'react';
import Box from "@mui/material/Box";
import InputWithIcon from "./InputWithIcon";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function LoginAction(props) {
    const {type} = props;

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

    return (
        <Box sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent:"center"
        }}>
            <InputWithIcon placeholder={getPlaceHolder()} icon={<PhoneIphoneIcon fontSize="medium"/>}/>
            <InputWithIcon placeholder="输入密码..." icon={<VpnKeyIcon fontSize="medium"/>}/>
        </Box>
    );
}

export default LoginAction;