import React, {useState} from 'react';
import axios from "axios";

export default function useInterceptor(props) {


    const errorHandler = (data) => {
        switch (data && data.code) {
            case 500:
                console.log("err")
        }
    }

    axios.interceptors.request.use(function (config) {
        return config
    }, function (error) {
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (resp) {
        const {data} = resp;
        errorHandler(data)
        return data
    }, function (error) {
        return Promise.reject(error);
    })
}
