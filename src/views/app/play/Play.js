import React, {useEffect, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Title from "./video/Title";
import VideoPlayer from "../../../components/player/VideoPlayer";
import Periods from "./video/Periods";
import PageTipFloatingBar from "../../../components/PageTipFloatingBar";
import BriefDesc from "./video/BriefDesc";
import Comments from "./comment/Comments";
import {GetItemFiles} from "../../../api/item.service";
import {useParams} from "react-router-dom";
import Video from "./video/Video";
import ThreeD from "./3d/ThreeD";


function Play(props) {
    let params = useParams();
    let itemId = params.id;
    const [item, setItem] = useState(null);
    const [rescType, setRescType] = useState(null);


    //获取当页的资源信息
    useEffect(() => {
        const fechItem = async () => {
            await GetItemFiles(itemId).then(
                data => setItem(data))
        }
        fechItem().catch()
    }, [])

    //设置资源类型
    useEffect(() => {
        item && setRescType(item.RescType)
    }, [item])

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

                <Grid item xs={11} sx={{position: "relative", display:"flex", mb:'80px'}}>
                    {/*<Video periods={item && item.Main}/>*/}
                    <ThreeD />
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