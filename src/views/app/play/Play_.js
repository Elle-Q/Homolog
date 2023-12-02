import React, {useEffect, useRef, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TitleHeader from "./TitleHeader";
import PageTipFloatingBar from "../../../components/PageTipFloatingBar";
import BriefDesc from "./video/BriefDesc";
import Comments from "../item/comment/Comments";
import {GetItemWithFiles} from "../../../api/item.service";
import {useParams} from "react-router-dom";
import Video from "./video/Video";
import {useDispatch, useSelector} from "react-redux";
import {selectPlayer} from "./playSlice";
import ThreeD from "./3d/ThreeD";


function Play(props) {
    let params = useParams();
    let itemId = params.id;
    const [rescType, setRescType] = useState(null);
    let dispatch = useDispatch();
    const {item} = useSelector(selectPlayer);

    //获取当页的资源信息
    useEffect(() => {
        dispatch(GetItemWithFiles(itemId))
    }, [])


    //设置资源类型
    useEffect(() => {
        item && setRescType(item.RescType)
    }, [item])

    if (!item) return <></>

    //todo: 根据资源类型展示资源(video, 3d, pdf, materials, textures)
    function renderRsc() {
       switch (rescType) {
           case 'video' :
               return <Video periods={item && item.Main}/>
           case '3d':
               return <ThreeD models={item && item.Main}/>
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
                    <TitleHeader title={item.Name}/>
                </Grid>

                <Grid item xs={11} sx={{position: "relative", mb:'80px', display:"flex"}}>
                    {renderRsc()}
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