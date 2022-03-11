import React, {useEffect, useState} from 'react';
import VideoPlayer from "../../../../components/player/VideoPlayer";
import Periods from "./Periods";

function Video(props) {
    const [videoSrc, setVideoSrc] = useState(null);
    const {periods} = props;

    //设置主文件数据源
    useEffect(() => {
        if (periods && periods.length > 0) {
            setVideoSrc(periods[0].QnLink)
        }
    }, [periods])

    //更改视频播放源
    const changeVideoSrc = (src) => {
        setVideoSrc(src);
    }

    return (
        <React.Fragment>
            <VideoPlayer videoSrc={{
                type: 'application/x-mpegURL',
                src: videoSrc,
            }}/>
            <Periods periods={periods} changeVideoSrc={(src) => changeVideoSrc(src)}/>
        </React.Fragment>
    );
}

export default Video;