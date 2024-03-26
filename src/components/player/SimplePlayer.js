import React, {useEffect, useState} from 'react';
import Player from "./Player";
import Box from "@mui/material/Box";


function SimplePlayer(props) {

    const {videoSrc} = props;

    const videoJsOptions = {
        autoplay: false,
        aspectRatio: "4:3",
        controls: true,
        responsive: true,
        fluid: true,
        sources: [videoSrc],
    }

    return (
        <Box
            id="videoPlayContainer"
            sx={{
                width:'65%',
                margin: 'auto',
                borderRadius: '10px',
            }}
        >
            <Player options={videoJsOptions}
            />
        </Box>
    );
}

export default SimplePlayer;