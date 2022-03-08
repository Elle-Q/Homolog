import React, {useEffect, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import PlaySideBar from "./video-play/Periods";
import Box from "@mui/material/Box";
import Title from "./video-play/Title";
import VideoPlayer from "../../../components/player/VideoPlayer";
import Periods from "./video-play/Periods";
import DanmuInput from "./video-play/DanmuInput";
import PageTipFloatingBar from "../../../components/PageTipFloatingBar";
import BriefDesc from "./video-play/BriefDesc";
import Comments from "./comment/Comments";
import { GetItemFiles} from "../../../api/item.service";
import {useParams} from "react-router-dom";


function Play(props) {
    //fixme: 状态管理（这里提到了高阶组件）
    const [danmuData, setDanmuData] = useState(null);
    const [item, setItem] = useState(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const danmuRef = React.createRef();
    let params = useParams();
    let itemId = params.id;

    useEffect(() => {
        const fechItem = async () => {
            await GetItemFiles(itemId).then(
                data => setItem(data))
        }
        fechItem().catch()
    }, [])

    useEffect(() => {
        if (item && item.Main.length > 0) {
            setVideoSrc(item.Main[0].QnLink)
        }
    }, [item])

    const handleDanmuSend = () => {
        setDanmuData(danmuRef.current.value);
        danmuRef.current.value = "";
    }

    const changeVideoSrc = (src) => {
        setVideoSrc(src);
    }

    if (!item) return <></>
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
                <Grid item xs={12}>
                    <Title title={item.ItemName}/>
                    {/*<VideoTag />*/}
                </Grid>

                <Grid item xs={7} sx={{height: '580px', position: "relative"}}>
                    {videoSrc && <VideoPlayer danmuData={danmuData}
                                              videoSrc={{
                                                  type: 'application/x-mpegURL',
                                                  src: videoSrc,
                                              }}/>}
                    {/*<VideoDanmu />*/}
                    <DanmuInput ref={danmuRef}
                                handleDanmuSend={handleDanmuSend}/>
                </Grid>

                <Grid item xs={4}>
                    <Periods periods={item && item.Main} changeVideoSrc={(src) => changeVideoSrc(src)}/>
                </Grid>
                <Grid item xs={7}>
                    <Comments/>
                </Grid>
                <Grid item xs={4}>
                    <BriefDesc/>
                </Grid>
            </Grid>

            <PageTipFloatingBar/>

        </Box>
    );
}

export default Play;