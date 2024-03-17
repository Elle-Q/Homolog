import React, {useEffect, useState} from 'react';
import Player from "./Player";
import Box from "@mui/material/Box";


function SimplePlayer(props) {

    const {videoSrc, size} = props;
    const [play, setPlay] = useState(false);
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
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
                width:'65%',
                margin: 'auto',
                borderRadius: '10px',
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