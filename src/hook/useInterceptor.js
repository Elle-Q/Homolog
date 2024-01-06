import React from 'react';
import {useDispatch} from "react-redux";
import {updateMsg} from "../components/alert/ops/alertSlice";
import TokenService from "../api/token.service";
import api from "../api/api";

export default function useInterceptor(props) {
    const dispatch = useDispatch();

    const errorHandler = (data) => {
        switch (data && data.code) {
            case 500:
                dispatch(updateMsg({status: "error", msg: data.msg}))
                break
            case 200:
                dispatch(updateMsg({status: "success", msg: data.msg}))
                break
            case 407:
                window.location = "/login";
                break
        }
    }

    api.interceptors.request.use(
        config => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = token;
            }
            return config
        },
        error => {
            return Promise.reject(error);
        });

    // Add a response interceptor
    api.interceptors.response.use(
        resp=> {
            const {data} = resp;
            errorHandler(data)
            return data
        },
        error => {
            const originalConfig = error.response.config;
            if (error.response) {
                //Access token was expired
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        let param = new FormData();
                        param.append("refreshToken", TokenService.getLocalRefreshToken());
                        api.post('/leetroll-app/user/refreshToken', param).then(resp => {
                            TokenService.updateLocalToken(resp);
                            return api(originalConfig);
                        });

                    } catch (_err) {
                        return Promise.reject(_err);
                    }
                }
            }
            return Promise.reject(error);
        })


}
