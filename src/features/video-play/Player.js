import React, {useEffect} from 'react';
import videojs from "video.js";
import "video.js/dist/video-js.css";
import './palyer.css'


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
            const player = playerRef.current = videojs(videoElement, options, () => {
                onReady && onReady(player);
            });

        } else {
            // update player through props
            const player = playerRef.current;
            // player.autoplay(options.autoplay);
            // player.src(options.sources);
        }
    }, [options]);

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
        <div>
            <video
                style={{borderRadius: '2px'}}
                ref={videoRef}
                className="video-js vjs-big-play-centered"
            />
        </div>
    );
}

export default Player;