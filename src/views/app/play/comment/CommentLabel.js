import React from 'react';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

function CommentLabel(props) {
    const {name, content, createTime, avatar, likeCnt,hateCnt } = props;
    return (
        <Grid container
              direction="row"
              alignItems="stretch"
              justifyContent="flex-start"
              columnSpacing={{xs: 1, sm: 2, md: 3}}
              sx={{mt: '30px'}}
        >
            <Grid item xs={1} style={{width: '10px', paddingLeft: 0}}>
                <Avatar
                    sx={{width: '50px', height: '50px'}}
                    alt="Elle Qu"
                    src={avatar}
                />
            </Grid>
            <Grid item xs={11}>
                <Stack direction="column" spacing={0}>
                    <Typography variant="body2" sx={{fontSize: '14px'}} color="#999">{name}</Typography>
                    <Typography variant="body2" sx={{fontSize: '16px', mt: '5px'}}
                                color="text.fifth">{content}</Typography>
                    <Typography variant="body2" sx={{fontSize: '12px', mt: '5px'}}
                                color="#999">{createTime}</Typography>
                    <div style={{mt: '5px'}}>
                        <IconButton sx={{
                            width: '20px',
                            height: '16px',
                            mr: '3px',
                            '& :hover': {
                                color: '#3399FF'
                            }
                        }}>
                            <ThumbUpOffAltIcon sx={{width: '20px', height: '16px',}}/>
                        </IconButton>
                        <span style={{fontSize: '12px', width: '20px',color: "#999"}} >{likeCnt}</span>
                        <IconButton sx={{
                            width: '20px',
                            height: '16px',
                            ml: '10px',
                            mr: '3px',
                            '& :hover': {
                                color: '#3399FF'
                            }}}>
                            <ThumbDownOffAltIcon sx={{width: '20px', height: '16px'}}/>
                        </IconButton>
                        <span style={{fontSize: '12px', width: '20px',color: "#999"}} >{hateCnt}</span>
                        <Button sx={{
                            width:'10px',
                            height:'20px',
                            border:"none",
                            backgroundColor:"transparent",
                            color:'#999',
                            fontSize:'12px',
                            '&:hover': {
                                color: '#3399FF'
                            }
                        }}>回复</Button>
                    </div>

                </Stack>
            </Grid>
        </Grid>

    );
}

export default CommentLabel;