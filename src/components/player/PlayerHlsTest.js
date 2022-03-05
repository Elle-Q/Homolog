import React from 'react';
import videojs from "video.js";
import Hls from "hls.js";

function PlayerHlsTest(props) {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;

    React.useEffect(() => {
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
                console.log("player is ready");
                onReady && onReady(player);
            });


            if (Hls.isSupported()) {
                let video = document.getElementById('video');
                let hls = new Hls();
                // bind them together
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    console.log('video and hls.js are now bound together !');
                    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                        console.log(
                            'manifest loaded, found ' + data.levels.length + ' quality level'
                        );
                    });
                });
            }


        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <video id='video' ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );
}

export default PlayerHlsTest;