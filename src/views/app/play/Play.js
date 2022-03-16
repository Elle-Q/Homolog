import React, {useEffect, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TitleHeader from "./TitleHeader";
import VideoPlayer from "../../../components/player/VideoPlayer";
import Periods from "./video/Periods";
import PageTipFloatingBar from "../../../components/PageTipFloatingBar";
import BriefDesc from "./video/BriefDesc";
import Comments from "./comment/Comments";
import {GetItemFiles} from "../../../api/item.service";
import {useParams} from "react-router-dom";
import Video from "./video/Video";
import Gtfl from "./3d/Gtfl";
import Glb from "./3d/Glb";
import {getPopularTags} from "../../../utils/ToolUtil";


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

    function renderRsc() {
       switch (rescType) {
           case 'video' :
               return <Video periods={item && item.Main}/>
           case '3d-glb':
               return  <Glb />
           case '3d-gltf':
               return <Gtfl />
       }
    }

    return (
        <Box sx={{
            width: '74%',
            ml: '13%',
            mr: '13%',
            overflow: "hidden",
        }}>
            <div style={{position: 'absolute', top: '100px', right: '10px'}} id='gui'/>

            <Grid container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-around"
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                <Grid item xs={12}>
                    <TitleHeader title={item.ItemName}/>
                </Grid>

                <Grid item xs={11} sx={{position: "relative", mb:'80px', display:"flex"}}>
                    {renderRsc()}
                    {/*<Video periods={item && item.Main}/>*/}
                    {/*<TestSphere />*/}
                    {/*<Gtfl />*/}
                    {/*<Glb />*/}
                    {/*<Text />*/}
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