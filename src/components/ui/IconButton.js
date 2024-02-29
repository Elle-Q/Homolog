import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import IconButton from "@mui/material/IconButton";
import React from "react";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

export const ThumbUpButton = (props) => {
    return <IconButton
        sx={{
            width: `${props.width}`,
            height: `${props.height}`,
            color: `${props.color}`,
            mr: '3px',
            '& :hover': {
                color: '#595DFD'
            },
        }}
        onClick={props.onClick}>
        <ThumbUpOffAltIcon sx={{width: `${props.width}`, height: `${props.height}`,}}/>
    </IconButton>
}

export const ThumbDownButton = (props) => {
    return <IconButton
        sx={{
            width: `${props.width}`,
            height: `${props.height}`,
            ml: '10px',
            mr: '3px',
            '& :hover': {
                color: '#3399FF'
            }
        }}
        onClick={props.onClick}>
        <ThumbDownOffAltIcon sx={{width: `${props.width}`, height: `${props.height}`,}}/>
    </IconButton>
}