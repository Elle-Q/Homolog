import React from 'react';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {alpha, styled} from '@mui/material/styles';

const StyledTypography = styled(Typography)( {
    color: '#bbb',
    lineHeight: '1.75em',
    fontSize:'14px',
    textAlign:'center',
    textShadow: '1px 1px 2px rgb(0 0 0 / 37%)'
})

function AuthorInfo(props) {
    return (
        <Box sx={{mb:'20px', textAlign:"center"}}>
            <Avatar alt="elle" src="/avatar/avatar1.jpg" sx={{ width: 120, height: 120 }}/>
            <Typography  variant="h6" sx={{display: {xs: 'none', sm: 'block'}}} >
                ELLE QU
            </Typography>

            <Typography  variant="body" sx={{
                color: '#bbb',
                lineHeight: '1.75em',
                fontSize:'14px',
                textShadow: '1px 1px 2px rgb(0 0 0 / 37%)'
            }} >
                 我 小可爱
            </Typography>
            <StyledTypography>
                <RoomOutlinedIcon fontSize="small" />shanghai, china
            </StyledTypography>
        </Box>
    );
}

export default AuthorInfo;