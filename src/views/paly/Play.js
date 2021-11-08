import React from 'react';
import Grid from "@mui/material/Grid";
import PlaySideBar from "../../features/video-play/VideoPeriods";
import Box from "@mui/material/Box";
import VideoInfo from "../../features/video-play/VideoInfo";
import VideoPlayer from "../../features/video-play/VideoPlayer";
import VideoPeriods from "../../features/video-play/VideoPeriods";

function Play(props) {
    return (
        <Box sx={{
            width: '76%',
            ml: '12%',
            mr: '12%',
            overflow: "hidden",
        }}>
            <Grid container
                  // rowSpacing={2}
                  direction="row"
                  alignItems="flex-start"
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid item xs={12}>
                    <VideoInfo title={"计算机图形学"}/>
                    {/*<VideoTag />*/}
                </Grid>
                <Grid item xs={8}>
                    <VideoPlayer />
                </Grid>
                <Grid item xs={4}>
                    <VideoPeriods />
                </Grid>
                <Grid item xs={12}>
                    {/*<VideoDanmu />*/}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Play;