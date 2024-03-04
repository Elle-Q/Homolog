import {alpha} from "@mui/material/styles";
import Button from "@mui/material/Button";
import React from "react";

export const OKButton = (props) => {
    const {handleClick} = props;

    return (
        <Button sx={{
            borderColor:'#252422',
            fontSize:'12px',
            color:'white',
            width:'80px',
            height:'40px',
            backgroundColor:alpha('#0aa858', 0.8),
            '&:hover': {
                backgroundColor:alpha('#0aa858', 0.9),
                borderColor:'#252422',
                fontSize:'14px',
            }
        }} autoFocus onClick={handleClick}>
            OK
        </Button>
    )
}

export const CancelButton = (props) => {
    const {handleClick} = props;

    return (
        <Button sx={{
            borderColor:'#252422',
            fontSize:'12px',
            color:'white',
            width:'80px',
            height:'40px',
            backgroundColor:alpha('#403D39', 0.3),
            '&:hover': {
                backgroundColor:alpha('#403D39', 0.9),
                borderColor:'#252422',
                fontSize:'14px',
            }
        }} autoFocus onClick={handleClick}>
            取消
        </Button>
    )
}

