import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import React from "react";

export function getStarIcons(score, width, height){
    const stars = [];
    const scoreInt = Math.floor(score);
    for (let i = 0; i < scoreInt; i++) {
        stars.push(<StarRateRoundedIcon sx={{width:width, height:height}}  key={i}/>)
    }
    if (score % scoreInt !== 0) {
        stars.push(<StarHalfRoundedIcon sx={{width:width, height:height}} key='6'/>)
    }
    return stars;
}


export function getColorFromUserStatus(status) {
    switch (status) {
        case 'online':
            return '#44b700'
        case 'offline':
            return '#252422'
        case 'busy':
            return '#FF0000'
    }
}