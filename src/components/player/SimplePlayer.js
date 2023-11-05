import React, {useEffect, useState} from 'react';
import Player from "./Player";
import Box from "@mui/material/Box";


function SimplePlayer(props) {

    const {videoSrc, size} = props;
    const [play, setPlay] = useState(false);
    const playerRef = React.useRef(null);

    console.log(videoSrc)
    const videoJsOptions = {
        autoplay: false,
        height: "auto",
        aspectRatio: "4:3",
        controls: true,
        responsive: true,
        fluid: true,
        sources: [videoSrc],
    }

    //toggle
    function togglePlay() {
        const player = playerRef.current;
        if (play) {
            player.pause();
        } else {
            player.play();
        }
    }

    //listen event
    const handlePlayerReady = (player) => {
        playerRef.current = player;
        //   handle player events
        player.on(['waiting', 'pause'], () => {
            setPlay(false);
        });

        player.on('playing', () => {
            setPlay(true)
        });

        player.on('dispose', () => {
        });

        player.on('seeked', () => {
            setPlay(true);
        });
    };


    return (
        <Box
            id="videoPlayContainer"
            sx={{
                ...size,
                // position: "absolute",
                borderRadius: '10px',
                zIndex: 1,
            }}
        >
            <Player
                options={videoJsOptions}
                onReady={handlePlayerReady}
            />
        </Box>
    );
}

export default SimplePlayer;