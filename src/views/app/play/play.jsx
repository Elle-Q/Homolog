import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {useParams} from "react-router-dom";
import Intro from "./intro/intro";
import VideoPlayer from "../../../components/player/VideoPlayer";
import {GetChapters} from "../../../api/chapter.service";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import {downloadAttachment} from "../../../api/item.service";


function Play(props) {
    let params = useParams();
    let itemId = params.id;
    const [detail, setDetail] = useState(null);
    const [chapters, setChapters] = useState(null)

    //获取当页的资源信息
    useEffect(() => {
        GetChapters(itemId).then(resp => {
            if (resp.length > 0 && resp[0].details.length > 0) {
                setDetail(resp[0].details[0])
                setChapters(resp)
            }
        })
    }, [itemId])

    const changeVideoDetail = (detail) => {
        setDetail(detail)
    }

    const handleDownload = () => {
        downloadAttachment(itemId).then(resp => {
            window.location.href = resp
        })
    }

    return (
        <Grid container
              direction="row"
              alignItems="flex-start"
              justifyContent="space-around"
              columnSpacing={{xs: 1, sm: 2, md: 3}}
              sx={{position: 'relative', backgroundColor: 'rgb(28,33,41)'}}
        >
            <Grid item xs={9} sx={{position: "relative", display: "flex"}}>
                {detail && <VideoPlayer detail={detail}/>}
            </Grid>
            <Grid sx={{display: "flex", flex: '1', flexDirection: 'column'}}>
                <Intro chapters={chapters} changeVideoDetail={(detail) => changeVideoDetail(detail)}/>
            </Grid>
            <IconButton onClick={handleDownload} sx={{
                backgroundColor: 'rgb(98,96,95)',
                position: 'absolute',
                bottom: 0,
                right: 10
            }}>
                <DownloadIcon fontSize="large" sx={{color: "white"}}/>
            </IconButton>
        </Grid>

    );
}

export default Play;