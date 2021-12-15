import React from 'react';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import qq from '../../assets/login_way/qq.svg'
import wechat from '../../assets/login_way/WeChat.svg'
import git from '../../assets/login_way/git.svg'
import gmail from '../../assets/login_way/gmail.svg'
import {alpha} from "@mui/system";

function LoginOtherWay(props) {

    const size = '25px';

    const CustomIconButton = (props) => {
        const {img} = props;
        return (<IconButton sx={{
            '&:hover':{
                transform: 'scale(1.2)',
                transition: 'all .2s ease  ',
                color: '#3399FF'
            }
        }}>
            {img}
        </IconButton>)
    }

    return (
        <div style={{marginTop:'30px'}}>
            <span style={{color:'#3399FF'}}>其他登录方式</span>
            <Stack
                direction='row'
                sx={{
                    mt:'10px',
                    // backgroundColor: alpha('#fff', 0.3),
                    // border: "1px solid #3399FF",
                }}>
                <CustomIconButton img={<img alt="qq" src={qq} style={{width: size, height: size}}/>} />
                <CustomIconButton img={<img alt="wechat" src={wechat} style={{width: size, height: size}}/>} />
                <CustomIconButton img={<img alt="git" src={git} style={{width: size, height: size}}/>} />
                <CustomIconButton img={<img alt="gmail" src={gmail} style={{width: size, height: size}}/>} />

            </Stack>
        </div>
    );
}

export default LoginOtherWay;