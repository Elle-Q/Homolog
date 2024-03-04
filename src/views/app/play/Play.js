import React, {useEffect,useState} from 'react';
import Grid from "@mui/material/Grid";
import {GetChapters} from "../../../api/item.service";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectPlayer, setChapters} from "./playSlice";
import Periods from "./video/Periods";
import VideoPlayer from "../../../components/player/VideoPlayer";


function Play(props) {
    let params = useParams();
    let itemId = params.id;
    const [src, setSrc] = useState(null);
    const {chapters} = useSelector(selectPlayer);
    let dispatch = useDispatch();

    //获取当页的资源信息
    useEffect(() => {
      GetChapters(itemId).then(resp => {
          dispatch(setChapters(resp))
      })
    }, [itemId])

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