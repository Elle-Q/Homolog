import React, {useEffect, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TitleHeader from "./TitleHeader";
import PageTipFloatingBar from "../../../components/PageTipFloatingBar";
import BriefDesc from "./video/BriefDesc";
import Comments from "./comment/Comments";
import {GetChapter, GetItemWithFiles} from "../../../api/item.service";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectPlayer} from "./playSlice";
import ThreeD from "./3d/ThreeD";
import Periods from "./video/Periods";
import VideoPlayer from "../../../components/player/VideoPlayer";
import {setNavBarShow, setShow} from "../home/navBarSlice";


function Play(props) {
    let params = useParams();
    let chapterId = params.id;
    const [src, setSrc] = useState(null);
    let dispatch = useDispatch();
    const {chapter} = useSelector(selectPlayer);

    //获取当页的资源信息
    useEffect(() => {
        dispatch(GetChapter(chapterId))
        dispatch(setNavBarShow(false))
    }, [])

    useEffect(() => {
        if (chapter && chapter.Episodes.length > 0) {
            setSrc(chapter.Episodes[0].QnLink)
        }
    }, [chapter])

    //todo: 根据资源类型展示资源(video, 3d, pdf, materials, textures)
    function renderRsc() {
        return <VideoPlayer videoSrc={{type: 'application/x-mpegURL', src: src}}/>
       // switch (chapter.name) {
       //     case 'video' :
       //         return <Video periods={item && item.Main}/>
       //     case '3d':
       //         return <ThreeD models={item && item.Main}/>
       // }
    }

    const changeVideoSrc = (src) => {
        setSrc(src)
    }

    return (
        <Box sx={{
            width: '100%',
            overflow: "hidden",
            backgroundColor: '#252422'
        }}>
            <div style={{position: 'absolute', top: '100px', right: '10px'}} id='gui'/>

            <Grid container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-around"
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                {/*<Grid item xs={12}>*/}
                {/*    <TitleHeader title={chapter.Name}/>*/}
                {/*</Grid>*/}

                <Grid item xs={11} sx={{position: "relative",mb:'80px', display:"flex"}}>
                    {renderRsc()}
                    <Periods periods={chapter && chapter.Episodes} changeVideoSrc={(src) => changeVideoSrc(src)}/>
                </Grid>

                <Grid item xs={11}>
                    <Comments/>
                </Grid>
               {/* <Grid item xs={4}>
                    <BriefDesc/>
                </Grid>*/}
            </Grid>

        </Box>
    );
}

export default Play;