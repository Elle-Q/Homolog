import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import IconButton from "@mui/material/IconButton";
import React from "react";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import {alpha} from "@mui/material/styles";

export const ThumbUpButton = (props) => {
    return <IconButton className="btn-icon"
                       sx={{
                           width: `${props.width}`,
                           height: `${props.height}`,
                           color: `${props.color}`,
                       }}
                       onClick={props.onClick}>
        <ThumbUpOffAltIcon sx={{width: `${props.width}`, height: `${props.height}`,}}/>
    </IconButton>
}

export const ThumbDownButton = (props) => {
    return <IconButton className="btn-icon"
                       sx={{
                           width: `${props.width}`,
                           height: `${props.height}`,
                           color: `${props.color}`,
                       }}
                       onClick={props.onClick}>
        <ThumbDownOffAltIcon sx={{width: `${props.width}`, height: `${props.height}`,}}/>
    </IconButton>
}

export const ActionButton = (props) => {
    const {icon, onClick, name} = props;

    return (
        <IconButton onClick={onClick}
                    sx={{
                        position: "relative",
                        left: `${name === 'logout' ? 30 : 70}px`,
                        top: `${name === 'logout' && 80}px`,
                        zIndex: '2',
                        backgroundColor: alpha('#484846', 0.5),
                        '&:hover': {
                            transform: 'scale(1.3)',
                            transition: 'all .2s ease .2s'
                        }
                    }}>
            {icon}
        </IconButton>
    )
}
