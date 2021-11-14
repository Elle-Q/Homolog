import React from 'react';
import Avatar from "@mui/material/Avatar";
import author from "../../assets/avatar2.jpg";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function VideoPlayerHeader(props) {
    const {visible} = props;

    return (
        <Box display="flex"
             flexDirection="row-reverse"
             sx={{
                 mr: '10px',
                 height: '50px',
                 alignItems: 'center',
                 opacity: `${visible}` === 'visible' ? 1 : 0,
                 transition: 'opacity 2s'
             }}>
            <Avatar alt="author" src={author}/>
            <Typography color="secondary"
                        sx={{
                            letterSpacing:'2px',
                            fontWeight:'2px',
                            fontFamily: '-apple-system'
                        }}>
                求佛得来的水印*_*
            </Typography>
        </Box>
    );
}

export default VideoPlayerHeader;