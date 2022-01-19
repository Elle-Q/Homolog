import React from 'react';
import {useDispatch} from "react-redux";
import {updateMsg} from "../features/alert/alertSlice";
import TokenService from "../api/token.service";
import api from "../api/api";

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
            case 401:
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
            const originalConfig = error.config;

            if (error.response) {
                //Access token was expired
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = api.post('/homo-app/user/refresh', {
                            RefreshToken: TokenService.getLocalRefreshToken()
                        }).then(resp => {
                            // dispatch(refreshToken(AccessToken));
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
