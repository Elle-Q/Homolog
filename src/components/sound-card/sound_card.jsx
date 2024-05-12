import React, {useEffect, useState} from 'react';
import WavesurferPlayer from '@wavesurfer/react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import "./sound_card.scss"
import {secondFormat} from "../../utils/ToolUtil";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {toggleAtion} from "../../api/action.service";
import ConfettiExplosion from "react-confetti-explosion";
import {download} from "../../api/item.service";

function SoundCard({item, width=1200}) {
    const [wavesurfer, setWavesurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [collected, setCollected] = useState(false);
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        setCollected(item.collected)
    }, [item]);
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

    const handleCollect = () => {
        if (!collected) {
            setActivated(true);
            setTimeout(() => setActivated(false), 1800);
        }
        toggleAtion(item.id, 'collect').then(resp => {
            setCollected(resp)
        })
    }

    //点击下载源文件
    const handleDownload = () => {
        download(item.id)
        window.location.href = item.main.link
    }

    return (
        <div className="sound-card">
            <div className="sound-card__top fadein" id="waveform">
                <WavesurferPlayer
                    width={width}
                    height={100}
                    waveColor="#7b7b7b"
                    progressColor="#595DFD"
                    url={item && item.main && item.main.link}
                    onReady={onAudioReady}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={onClick}
                />

                <div className="sound-card__controll">
                    {
                        isPlaying ?
                            <PauseRoundedIcon className="sound-card__controll-icon" onClick={onPlayPause}/>
                            : <PlayArrowRoundedIcon className="sound-card__controll-icon" onClick={onPlayPause}/>
                    }
                    <DownloadRoundedIcon className="sound-card__controll-icon"
                                         onClick={handleDownload}/>
                    <FavoriteIcon className="sound-card__controll-icon--collect"
                                  sx={{color: `${collected ? '#ff0a54' : 'white'}`}}
                                  onClick={handleCollect}
                    />
                    {activated && <ConfettiExplosion/>}
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