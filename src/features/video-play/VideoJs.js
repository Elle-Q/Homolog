import React, {useEffect} from 'react';
import videojs from "video.js";
import "video.js/dist/video-js.css";


const styles = {
    cunstomize: {
        borderRadius: '10px'
    }
}

function VideoJs(props) {

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady, play} = props;

    useEffect(() => {
        play ? videoRef.current.play() : videoRef.current.pause();
    },[play])

    useEffect(() => {
        console.log(playerRef)
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
                console.log("player is ready");
                onReady && onReady(player);
            });
        } else {
            // you can update player here [update player through props]
            // const player = playerRef.current;
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
                className="video-js vjs-big-play-centered"/>
        </div>
    );
}

export default VideoJs;