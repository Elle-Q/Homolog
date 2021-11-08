import React from 'react';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

function VideoInfo(props) {
    const {title} = props;

    return (
        <Box sx={{
            mt: '80px',
            mb:'30px'
        }}>
            <Typography
                variant="h5"
                sx={{
                    display: {
                        xs: 'none', sm: 'block',
                        fontFamily: '-apple-system'
                    }
                }}
            >
                {title}
            </Typography>
        </Box>
    );
}

export default VideoInfo;