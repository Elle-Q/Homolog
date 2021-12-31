import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {updateMsg} from "../features/alert/alertSlice";
import TokenService from "../api/token.service";
import {refreshToken} from "../api/auth.service";

export default function useInterceptor(props) {
    const dispatch = useDispatch();

    const errorHandler = (data) => {
        switch (data && data.Code) {
            case 500:
                dispatch(updateMsg({status: "error", msg: data.Msg}))
                break
            case 200:
                dispatch(updateMsg({status: "success", msg: data.Msg}))
                break
        }
    }

    axios.interceptors.request.use(
        config => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer' + token;
            }
            return config
        },
        error => {
            return Promise.reject(error);
        });

    // Add a response interceptor
    axios.interceptors.response.use(
        resp=> {
            const {data} = resp;
            errorHandler(data)
            return data
        },
        async error => {
            const originalConfig = error.config;

            if (originalConfig.url !== '/login' && error.response) {
                //Access token was expired
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await axios.post('/auth/refresh-token', {
                            RefreshToken: TokenService.getLocalRefreshToken()
                        });

                        const {accessToken} = rs.data;

                        dispatch(refreshToken(accessToken));
                        TokenService.updateLocalAccessToken(accessToken);
                        return originalConfig;
                    } catch (_err) {
                        return Promise.reject(_err);
                    }
                }
            }
            return Promise.reject(error);
        })


}
