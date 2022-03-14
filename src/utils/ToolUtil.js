import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import React from "react";
import Button from "@mui/material/Button";

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


export function getPopularTags(tags, name) {
    return (
        <React.Fragment>
            <span style={{marginLeft: '50px', marginRight: '10px'}}>{name}</span>
            {
                tags.map((k, index) => {
                    return (
                        <Button key={index} sx={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: '#CCC5B9',
                            mr: '15px',
                            '&::before': {
                                content: `'🏷'`,
                            },
                            '&:hover': {
                                transform: 'scale(1.1)',
                                transition: 'all .2s ease  ',
                                color: '#3399FF'
                            }
                        }}><span style={{marginLeft: '5px', fontSize: '14px'}}> {k.name}({k.cnt})</span></Button>
                    )
                })
            }
        </React.Fragment>
    );
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