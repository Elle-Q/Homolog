import React, {useEffect, useState} from 'react';
import Player from "./Player";
import Box from "@mui/material/Box";
import ControlBar from "./ControlBar";
import Barrage from 'barrage-ui';
import barageData from '../../json/barrage.json'
import DanmuInput from "../../views/app/play/video/DanmuInput";
import Stack from "@mui/material/Stack";

function VideoPlayer(props) {

    const {videoSrc} = props;
    const [danmuData, setDanmuData] = useState(null);
    const [play, setPlay] = useState(false);
    const [visible, setVisible] = useState("hidden");
    const [barrageVisible, setBarrageVisible] = useState(true);
    const playerRef = React.useRef(null);
    const barrageRef = React.useRef(null);
    const barrageInputRef = React.createRef();

    const videoJsOptions = {
        autoplay: false,
        height:"auto",
        aspectRatio: "4:3",
        controls: true,
        responsive: true,
        fluid: true,
        sources: [videoSrc],
        controlBar: {
            children: [
                {
                    name: 'ProgressControl'
                },
            ]
        }
    }

    useEffect(() => {
        barrageRef.current=new Barrage({
            container: document.getElementById('videoPlayContainer'),
            data: barageData,
            config: {
                duration: -1,
                speed: 50,
                fontSize: 15,
                fontFamily: '-apple-system',
                textShadowBlur: 1.0,
                opacity: 0.5,
                defaultColor: '#fff',
            },
        });
    },[])

    useEffect(() => {
        // if (!playerRef.current) return;
        const player = playerRef.current;
        if (player) {
            player.pause();
            player.src(videoSrc);
            player.load()
        }
    },[videoSrc])

    useEffect(() => {
        const player = playerRef.current;
        if (!player || !barrageVisible) return;
        barrageRef.current.add({
            time: player.currentTime() * 1000,
            text: danmuData,
            color:"red"
        });
    },[danmuData])

    //toggle
    function togglePlay() {
        const player = playerRef.current;
        if (play) {
            player.pause();
        } else {
            player.play();
        }
    }

    //toggleShowBarrage
    function toggleShowBarrage() {
        setBarrageVisible(!barrageVisible);
        if (barrageVisible) {
            barrageRef.current.setData([]);
        } else {
            barrageRef.current.setData(barageData);
        }
    }

    //发送弹幕
    const handleDanmuSend = () => {
        setDanmuData(barrageInputRef.current.value);
        barrageInputRef.current.value = "";
    }


    //listen event
    const handlePlayerReady = (player) => {
        playerRef.current = player;
        //   handle player events
        player.on(['waiting', 'pause'], () => {
            setPlay(false);
            barrageRef.current.pause();
        });

        player.on('playing', () => {
            setPlay(true)
            barrageRef.current.play();
        });

        player.on('dispose', () => {
        });

        player.on('seeked', () => {
            setPlay(true);
            barrageRef.current.goto(player.currentTime() * 1000);
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


    return (
        <Stack
            id="videoPlayContainer"
            sx={{
                width: '100%',
                backgroundColor: 'black',
                borderRadius: '0 0 10px 10px',
                zIndex: 1,
                display: 'flex'
            }}
            onMouseEnter={() => setVisible("visible")}
            onMouseLeave={() => setVisible("hidden")}
        >
            <Box sx={{display: 'flex', width:'65%', margin: 'auto'}}>
                <Player options={videoJsOptions} onReady={handlePlayerReady} />
            </Box>
            <ControlBar play={play}
                        togglePlay={togglePlay}
                        visible={visible}
                        barrageVisible={barrageVisible}
                        rePlay={rePlay}
                        setVolume={setVolume}
                        enterFullScreen={enterFullScreen}
                        handleRateClick={handleRateClick}
                        toggleShowBarrage={toggleShowBarrage}
            />
            <DanmuInput ref={barrageInputRef} handleDanmuSend={handleDanmuSend}/>

        </Stack>
    );
}

export default VideoPlayer;