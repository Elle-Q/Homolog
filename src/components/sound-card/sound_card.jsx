import React, {useState} from 'react';
import WavesurferPlayer from '@wavesurfer/react'
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import "./sound_card.scss"
import {secondFormat} from "../../utils/ToolUtil";

function SoundCard({item}) {
    const [wavesurfer, setWavesurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)

    const onAudioReady = (ws) => {
        setWavesurfer(ws)
        setIsPlaying(false)
        setDuration(secondFormat(ws.getDuration()))
    }

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause()
    }

    const onClick = () => {
        wavesurfer && wavesurfer.play()
        setIsPlaying(true)
    }

    return (
        <div className="sound-card">
            <div className="sound-card__top fadein" id="waveform">
                <WavesurferPlayer
                    width={420}
                    height={100}
                    waveColor="#7b7b7b"
                    progressColor="#595DFD"
                    // barGap={0}
                    // barRadius={10}
                    // barWidth={10}
                    url={item && item.main && item.main.link}
                    onReady={onAudioReady}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={onClick}
                />

                <div className="sound-card__controll">
                    {
                        isPlaying ?
                            <PauseCircleFilledRoundedIcon className="sound-card__controll-icon" onClick={onPlayPause}/>
                            : <PlayCircleRoundedIcon className="sound-card__controll-icon" onClick={onPlayPause}/>
                    }
                    <DownloadRoundedIcon className="sound-card__controll-icon"/>
                </div>
            </div>

            <div className="sound-card__heading">
                <h2>{item.name}</h2>
                <span className="sound-card__heading--time">{duration}</span>
            </div>
        </div>
    );
}

export default SoundCard;