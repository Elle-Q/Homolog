import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import AuthService from "../../../api/auth.service";
import Button from "@mui/material/Button";
import TokenService from "../../../api/token.service";
import UserService from "../../../api/user.service";

function Result(props) {

    let [params] = useSearchParams();
    const code = params.get("code");
    const [success, setSuccess] = useState(true)
    const navigate = useNavigate();
    const [timeoutId, setTimeoutId] = useState(null)

    useEffect(() => {
        AuthService.checkLoginStatus(code).then(resp => {
            if (resp === null) {
                setSuccess(false)
            } else {
                //设置token
                TokenService.setTokens({
                    AccessToken: resp.accessToken,
                    RefreshToken: resp.refreshToken,
                });
                fetchUser().catch()
            }
        })
        return () => clearTimeout(timeoutId)
    }, []);


    const fetchUser = async () => {
        await UserService.getUser().then(() => {
            setSuccess(true)
            const id = setTimeout(navigate('/'), 5000);
            setTimeoutId(id)
        });
    }

    return (
        <div style={{margin: 'auto'}}>
            {
                success ?
                    <span style={{fontSize: '36px', color: '#fff', fontWeight: 'bold'}}>
                        登录成功, 5秒后跳转<Link to="/">首页</Link>
                    </span>
                    :
                    <span style={{fontSize: '36px', color: '#fff', fontWeight: 'bold'}}>
                       登录失败, 5秒后跳转<Link to="/login">登录页面</Link>
                    </span>
            }

            <Button>到首页</Button>
        </div>
    );
}

export default Result;