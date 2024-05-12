import React, {useEffect, useState} from 'react';
import Player from "./Player";
import Box from "@mui/material/Box";


function SimplePlayer(props) {

    const {src} = props;
    const playerRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const player = playerRef.current;
        if (player) {
            player.pause();
            player.src(src);
            player.load()
        }
    }, [src])

    useEffect(() => {
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    const videoJsOptions = {
        autoplay: false,
        aspectRatio: "4:3",
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            type: 'video/mp4',
            src: src
        }],
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;
        player.on(['waiting', 'pause'], () => {
            setIsPlaying(false);
        });

        player.on('playing', () => {
            setIsPlaying(true)
        });

        player.on('dispose', () => {
            player.dispose()
        });
    };

    const togglePlay = () => {
        if (!playerRef.current) return;
        const player = playerRef.current;
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <Box
            id="simpleVideoPlayContainer"
            sx={{
                width: '100%',
                margin: 'auto',
                borderRadius: '10px',
            }}
            onMouseOver={togglePlay}
            onMouseOut={togglePlay}
        >
            <Player options={videoJsOptions} onReady={handlePlayerReady}/>
        </Box>
    );
}

export default SimplePlayer;