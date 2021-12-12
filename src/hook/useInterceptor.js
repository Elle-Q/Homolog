import React, {useState} from 'react';
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function useInterceptor(props) {
    // const [status, setStatus] =  useState(null);
    //
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
        console.log("resp:", resp)
        const {data} = resp;
        errorHandler(data)
        return data
    }, function (error) {
        return Promise.reject(error);
    })

    // function render(status) {
    //     switch (status) {
    //         case 'error' :
    //             return (
    //                 <Alert severity="error">
    //                     <AlertTitle>Error</AlertTitle>检查参数是否正确且完整
    //                 </Alert>
    //             )
    //         case 'success' :
    //             return (
    //                 <Alert severity="success">
    //                     <AlertTitle>成功</AlertTitle>
    //                 </Alert>
    //             )
    //         default :
    //             return (<div />)
    //     }
    // }
    //
    // return (
    //     <React.Fragment>
    //         {render(status)}
    //     </React.Fragment>
    // )
}
