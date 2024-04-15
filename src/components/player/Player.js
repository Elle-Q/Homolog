import React, {useEffect} from 'react';
import videojs from "video.js";
import "video.js/dist/video-js.css";
import './player.scss'
import Hls from "hls.js";


function Player(props) {

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady, play} = props;

    useEffect(() => {
        play ? videoRef.current.play() : videoRef.current.pause();
    },[play])

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;
            let hls = new Hls();
            hls.attachMedia(videoElement);
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                // hls.loadSource('http://private.video.gomolog.com/item/3/main/video2.m3u8?pm3u8/0&e=1646592989&token=WhRnhuuljtU1hBNKbBLkkX2T-ymTLTDs_pC7PSn4:3aa5qb8NQGN5kavOzjVS5gmOz7I=');
                hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                    console.log(
                        'manifest loaded, found ' + data.levels.length + ' quality level'
                    );
                });
            });
            const player = playerRef.current = videojs(videoElement, options, () => {
                onReady && onReady(player);
            });
        } else {
            const player = playerRef.current;
            onReady(player)
        }

    }, [options, onReady]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

    return (
            <video
                ref={videoRef}
                className="video-js vjs-big-play-centered"
            />
    );
}

export default Player;