import React from 'react';
import Box from "@mui/material/Box";
import {alpha} from "@mui/system";

function ColoredLabel(props) {
    const {color, content, shape, style} = props

    return (
        <Box sx={{
            ...style,
            border: `1px solid ${color}`,
            cursor: "pointer",
            backgroundColor:alpha(color,0.3),
            color: color,
            borderRadius: '2em',
            alignItems: "center",
            justifyContent: "flex-start",
            display: 'flex',
            '&:hover': {
                width: 'auto',
            }
        }}>{content}</Box>
    );
}

export default ColoredLabel;