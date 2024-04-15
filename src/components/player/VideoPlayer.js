import React, {useEffect, useState} from 'react';
import Player from "./Player";
import Box from "@mui/material/Box";
import ControlBar from "./ControlBar";
import Slider from '@mui/material/Slider';
import {timeFormat} from "../../utils/ToolUtil";

function VideoPlayer(props) {

    const {detail} = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const [visible, setVisible] = useState("hidden");
    const [progressTime, setProgressTime] = useState("00:00:00");
    const [totalTime, setTotalTime] = useState(null);
    const playerRef = React.useRef(null);
    const [process, setProcess] = useState(0)
    const [duration, setDuration] = useState(100)

    const videoJsOptions = {
        autoplay: false,
        aspectRatio: "16:9",
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            type: 'application/x-mpegURL',
            src: detail.link
        }],
    }

    useEffect(() => {
        const player = playerRef.current;
        if (player) {
            player.pause();
            player.src(detail.link);
            player.load()
        }
        setDuration(detail.duration)
        setTotalTime(timeFormat(detail.duration))
    }, [detail])

    //toggle
    function togglePlay() {
        const player = playerRef.current;
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
        setIsPlaying(!isPlaying)
    }

    //listen event
    const handlePlayerReady = (player) => {
        playerRef.current = player;
        //   handle player events
        player.on(['waiting', 'pause'], () => {
            setIsPlaying(false);
        });

        player.on('playing', () => {
            setIsPlaying(true)
        });

        player.on('dispose', () => {
        });

        player.on('seeked', () => {
            setIsPlaying(true);
        });

        player.on('timeupdate', () => {
            setProgressTime(timeFormat(player.currentTime()))
        });

        player.on('tap', () => {
            debugger
            setIsPlaying(!isPlaying);
        });

        player.on("fullscreenchange", function(){
            if(player.isFullscreen()){
                player.exitFullscreen();
            }
        });

    };

    const rePlay = () => {
        playerRef.current.currentTime(0);
    }

    const setVolume = (volume) => {
        playerRef.current.volume(volume / 100);
    }

    const enterFullScreen = () => {
        playerRef.current.requestFullscreen();
    };

    const handleRateClick = (event, popupState) => {
        const {myValue} = event.currentTarget.dataset;
        popupState.close();
        playerRef.current.playbackRate(myValue);
    };

    const handleUpdateTime = (e) => {
        setProcess(e.target.value);
        playerRef.current.currentTime(e.target.value);
    }

    return (
        <Box id="videoPlayContainer" sx={{width: '100%', margin: 'auto', position: 'relative'}}
             onMouseEnter={() => setVisible("visible")}
             onMouseLeave={() => setVisible("hidden")}>
            <Player options={videoJsOptions} onReady={handlePlayerReady}/>
            <div style={{position: "absolute", bottom: 0, width: '100%',}}>
                <Slider
                    value={process}
                    max={duration}
                    step={1}
                    onChange={handleUpdateTime}
                    sx={{
                        color: "#595DFD",
                        transition: 'opacity 2s',
                        opacity: `${visible}` === 'visible' ? 1 : 0,
                    }}
                />
                <ControlBar play={isPlaying}
                            togglePlay={togglePlay}
                            visible={visible}
                            showTime={progressTime}
                            totalTime={totalTime}
                            rePlay={rePlay}
                            setVolume={setVolume}
                            enterFullScreen={enterFullScreen}
                            handleRateClick={handleRateClick}
                />
            </div>
        </Box>
    );
}

export default VideoPlayer;