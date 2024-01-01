import React, {useEffect, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TitleHeader from "./TitleHeader";
import PageTipFloatingBar from "../../../components/PageTipFloatingBar";
import BriefDesc from "./video/BriefDesc";
import Comments from "../item/comment/Comments";
import {GetChapters, GetItemWithFiles} from "../../../api/item.service";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectPlayer} from "./playSlice";
import ThreeD from "./3d/ThreeD";
import Periods from "./video/Periods";
import VideoPlayer from "../../../components/player/VideoPlayer";
import {setNavBarShow, setShow} from "../home/header/NavBarSlice";


function Play(props) {
    let params = useParams();
    let itemId = params.id;
    const [src, setSrc] = useState(null);
    let dispatch = useDispatch();
    const {chapters} = useSelector(selectPlayer);

    //获取当页的资源信息
    useEffect(() => {
        dispatch(GetChapters(itemId))
        dispatch(setNavBarShow(false))
    }, [])

    useEffect(() => {
        if (chapters && chapters.length > 0 && chapters[0].Episodes.length > 0) {
            setSrc(chapters[0].Episodes[0].QnLink)
        }
    }, [chapters])

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
            <Grid container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-around"
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                <Grid item xs={10} sx={{position: "relative", display:"flex"}}>
                    {renderRsc()}
                </Grid>
                <Grid sx={{display:"flex", flex: '1'}}>
                    <Periods changeVideoSrc={(src) => changeVideoSrc(src)}/>
                </Grid>
            </Grid>

    );
}

export default Play;