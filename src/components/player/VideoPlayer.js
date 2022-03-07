import React, {useEffect, useState} from 'react';
import Player from "./Player";
import Box from "@mui/material/Box";
import ControlBar from "./ControlBar";
import InnerPlayerHeader from "../../views/app/play/video-play/InnerPlayerHeader";
import Barrage from 'barrage-ui';
import barageData from '../../json/barrage.json'
import Hls from "hls.js";




function VideoPlayer(props) {

    const {videoSrc, danmuData } = props;
    const [play, setPlay] = useState(false);
    const [visible, setVisible] = useState("hidden");
    const [barrageVisible, setBarrageVisible] = useState(true);
    const playerRef = React.useRef(null);
    const barrageRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
        height:"auto",
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
        if (!playerRef.current) return;
        playerRef.current.pause();
        playerRef.current.src(videoSrc);
        playerRef.current.load()
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
        <Box
            id="videoPlayContainer"
            sx={{
                height:'530px',
                width:'810px',
                // width:'100%',
                position:"absolute",
                borderRadius: '10px',
                backgroundColor: 'black',
                zIndex: 1,
            }}
            onMouseEnter={() => setVisible("visible")}
            onMouseLeave={() => setVisible("hidden")}
        >
            <InnerPlayerHeader visible={visible}/>

            <Box sx={{margin: '5px 30px '}}>
                <Player
                    options={videoJsOptions}
                    onReady={handlePlayerReady}
                />
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

        </Box>
    );
}

export default VideoPlayer;