import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Comments(props) {
    return (
        <Box
            sx={{
                height:'800px',
                width:'100%',
                borderRadius: '10px',
                zIndex: 1,
                // boxShadow: '0 0 1px #3399FF',
                // border: '1px solid #0a0908',
                padding: '10px',
            }}
        >
            <Typography variant="body2" sx={{fontSize: '20px'}} color="text.fifth"> 56 评论</Typography>


        </Box>
    );
}

export default Comments;