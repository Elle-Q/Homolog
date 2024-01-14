import React from 'react';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function Footer(props) {
    return (
        <Box sx={{
            flexGrow: 1,
            boxShadow: "none",
            position: 'relative',
            height:'200px',
            width: '100%',
            bottom: 0,
            left:0,
            backgroundColor: "transparent"
        }}>
            <Divider />

        </Box>
    );
}

export {Footer} ;

