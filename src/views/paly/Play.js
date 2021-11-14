import React, {useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import PlaySideBar from "../../features/video-play/VideoPeriods";
import Box from "@mui/material/Box";
import VideoInfo from "../../features/video-play/VideoInfo";
import VideoPlayer from "../../features/video-play/VideoPlayer";
import VideoPeriods from "../../features/video-play/VideoPeriods";
import DanmuInput from "../../features/video-play/DanmuInput";
import PageTipFloatingBar from "../../common/PageTipFloatingBar";
import VideoBriefDesc from "../../features/video-play/VideoBriefDesc";
import Comments from "../../features/comment/Comments";


function Play(props) {
    //fixme: 状态管理（这里提到了高阶组件）
    const [danmuData, setDanmuData] = useState(null);
    const [videoSrc, setVideoSrc] = useState('video1.mp4');

    const danmuRef = React.createRef();


    const handleDanmuSend = () => {
        setDanmuData(danmuRef.current.value);
        danmuRef.current.value="";
    }

    const changeVideoSrc = (src) => {
        setVideoSrc(src);
    }

    return (
        <Box sx={{
            width: '74%',
            ml: '13%',
            mr: '13%',
            overflow: "hidden",
        }}>
            <Grid container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-around"
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                <Grid item xs={12} >
                    <VideoInfo title={"计算机图形学"}/>
                    {/*<VideoTag />*/}
                </Grid>

                <Grid item xs={7} sx={{height:'580px', position:"relative"}}>
                    <VideoPlayer danmuData={danmuData} videoSrc={videoSrc}/>
                    {/*<VideoDanmu />*/}
                    <DanmuInput ref={danmuRef}
                                handleDanmuSend={handleDanmuSend}/>
                </Grid>

                <Grid item xs={4}>
                    <VideoPeriods changeVideoSrc={changeVideoSrc}/>
                </Grid>

                <Grid item xs={7}  >
                    <Comments />
                </Grid>

                <Grid item xs={4}  >
                    <VideoBriefDesc />
                </Grid>
            </Grid>

            <PageTipFloatingBar />

        </Box>
    );
}

export default Play;