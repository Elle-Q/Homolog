import React from 'react';
import Box from "@mui/material/Box";
import {alpha} from "@mui/system";

function ColoredLabel(props) {
    const {color="#ffffff", content, style, className} = props

    return (
        <Box className={className} sx={{
            ...style,
            border: `1px solid ${color}`,
            cursor: "pointer",
            backgroundColor:alpha(color,0.3),
            color: color,
            borderRadius: '1rem',
            alignItems: "center",
            justifyContent: "flex-start",
            display: 'flex',
            fontSize: '1.4rem',
            padding: '.3rem .8rem',
            '&:hover': {
                width: 'auto',
            }
        }}>{content}</Box>
    );
}

export default ColoredLabel;