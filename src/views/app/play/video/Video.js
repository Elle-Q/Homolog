import React, {useEffect, useState} from 'react';
import VideoPlayer from "../../../../components/player/VideoPlayer";
import Periods from "./Periods";
import {useDispatch, useSelector} from "react-redux";
import {selectLoadingModal} from "../../../../components/loading/loading-slice";
import Loading from "../../../../components/loading/Loading";

const videoContainer = {
    position: "relative",
    width: '210px',
    height: '210px',
    aspectRatio: '4/3',
    textAlign: 'center',
    border: "5px dotted #403D39"
}


function Video(props) {
    const {src} = props;

    return (
        <React.Fragment>
            {
                src && <VideoPlayer videoSrc={{type: 'application/x-mpegURL', src: src}}/>
            }
        </React.Fragment>
    );
}

export default Video;