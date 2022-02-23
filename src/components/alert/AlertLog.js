import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectAlert, close} from "./alertSlice";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function AlertLog(props) {
    const {openAlert, status, msg} = useSelector(selectAlert);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(function () {
            dispatch(close())
        }, 3000);//3 Second delay

        return () => clearTimeout(timer);
    }, [openAlert])

    return (
        <React.Fragment>
            {
                openAlert &&
                <Alert sx={{
                    position:"absolute",
                    width:'500px',
                    bottom:'5px',
                    backgroundColor:"#0a0908",
                    border:'1px solid #403D39',
                    boxShadow: "0 0 10px #403D39",
                    zIndex:999,
                }}
                       severity={status}>
                    <AlertTitle>{status}</AlertTitle>
                    {msg}
                </Alert>
            }
        </React.Fragment>
    )
}

export default AlertLog;