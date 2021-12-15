import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import {updateMsg} from "../features/alert/alertSlice";

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

    axios.interceptors.request.use(function (config) {
        return config
    }, function (error) {
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(
        function (resp) {
            const {data} = resp;
            errorHandler(data)
            return data
        },
        function (error) {
            return Promise.reject(error);
        })


}
