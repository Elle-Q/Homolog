import React from 'react';
import "./styles.css";
import PlayerHlsTest from "./components/player/PlayerHlsTest";
import Hls from "hls.js";


function App_testVideo() {
    const playerRef = React.useRef(null);

    const videoJsOptions = { // lookup the options in the docs for more options
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'http://private.video.gomolog.com/test.m3u8?pm3u8/0&e=1646339666&token=WhRnhuuljtU1hBNKbBLkkX2T-ymTLTDs_pC7PSn4:qMUShqn0cPsTmPQn1RydsZHuEas=',
            type: 'application/x-mpegURL'
        }]
    }

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // you can handle player events here
        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };
    return (
        <>
            <div>顶顶顶顶 </div>

            <PlayerHlsTest options={videoJsOptions} onReady={handlePlayerReady} />

            <div>Rest of app here</div>
        </>
    );
}

export default App_testVideo;
