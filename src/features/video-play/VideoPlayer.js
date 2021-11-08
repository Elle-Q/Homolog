import React, {useState} from 'react';
import VideoJs from "./VideoJs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import author from '../../assets/avatar2.jpg'
import Grid from "@mui/material/Grid";
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import UseInput from "./CustomInput";

function VideoPlayer(props) {
    const CustomInput = UseInput;
    const {videoSrc} = props;
    const [play, setPlay] = useState(false);
    const playerRef = React.useRef(null);
    const videoJsOptions = { // lookup the options in the docs for more options
        autoplay: false,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'video1.mp4',
            type: 'video/mp4'
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
        <Box sx={{
            // padding:'50px 50px 0 50px',
            borderRadius: '10px',
            backgroundColor: 'black',
            zIndex:1,
        }}>

            <Stack direction="column">
                <Box display="flex"
                     flexDirection="row-reverse"
                     sx={{mr:'10px', height:'50px', alignItems: 'center'}}>
                    <Avatar  alt="Remy Sharp" src={author}/>
                 </Box>
                <Box sx={{margin:'0px 30px '}}>
                    <VideoJs
                        options={videoJsOptions}
                        onReady={handlePlayerReady}
                        play={play}
                    />
                </Box>
                <Box display="flex"
                     flexDirection="row-start"
                     sx={{
                         mr:'10px',
                         height:'50px',
                         alignItems: 'center',
                         ml:'20px'
                     }}>
                    <Button sx={{
                        backgroundColor: "inherit",
                        border: "none",
                    }}
                            onClick={() => setPlay(!play)}>
                        {
                            play ? <PauseCircleFilledRoundedIcon fontSize="large" sx={{color:'secondary.light', }}/>
                            : <PlayCircleRoundedIcon fontSize="large" sx={{color:'secondary.light'}}/>
                        }

                    </Button>
                    <Button sx={{
                        backgroundColor: "inherit",
                        border: "none",
                    }}
                            onClick={() => {}}>
                        <SkipNextRoundedIcon fontSize="medium" sx={{color:'secondary.light'}}/>
                    </Button>
                    <Button sx={{
                        backgroundColor: "inherit",
                        border: "none",
                    }}
                            onClick={() => {}}>
                        <ReplayRoundedIcon fontSize="medium" sx={{color:'secondary.light'}}/>
                    </Button>
                </Box>

                <CustomInput />

            </Stack>

        </Box>
    );
}

export default VideoPlayer;