import {alpha} from "@mui/material/styles";
import Button from "@mui/material/Button";
import React from "react";

export const SaveButton = (props) => {
    const {handleClick} = props;

    return (
        <Button sx={{
            borderColor:'#252422',
            backgroundColor:"transparent",
            fontSize:'12px',
            color:'secondary.light',
            width:'80px',
            height:'50px',
            '&:hover': {
                backgroundColor:alpha('#0aa858', 0.3),
                borderColor:'#252422',
                fontSize:'14px',
            }
        }} autoFocus onClick={handleClick}>
            保存
        </Button>
    )
}

export const CancelButton = (props) => {
    const {handleClick} = props;

    return (
        <Button sx={{
            borderColor:'#252422',
            backgroundColor:"transparent",
            fontSize:'12px',
            color:'text.secondary',
            width:'80px',
            height:'50px',
            '&:hover': {
                backgroundColor:alpha('#403D39', 0.3),
                borderColor:'#252422',
                fontSize:'14px',
            }
        }} autoFocus onClick={handleClick}>
            取消
        </Button>
    )
}