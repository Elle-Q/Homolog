import React, {useState} from 'react';
import Box from "@mui/material/Box";
import styled, {keyframes} from "styled-components";
import Typography from "@mui/material/Typography";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const spin = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

function Intro(props) {
    const {changeVideoDetail, chapters} = props;
    const [curCpIndex, setCurCpIndex] = useState(0);
    const [curEpiIndex, setCurEpiIndex] = useState(0);
    const [hidden, setHidden] = useState(false)

    const handleIndexChange = (cpIndex, epiIndex) => {
        setCurCpIndex(cpIndex);
        setCurEpiIndex(epiIndex);
        changeVideoDetail(chapters[cpIndex].details[epiIndex]);
    }

    return (
        <div style={{overflow: 'auto', maxHeight: '800px'}}>
            {
                chapters && chapters.map((chapter, cpIndex) => {
                    return (
                        <div key={cpIndex} style={{marginBottom: '20px'}}>
                            <Box display={"flex"} sx={{width: '300px'}}>
                                <div style={{height: '30px', width: '5px', backgroundColor: "rgba(89,93,253,0.51)"}}></div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    opacity: '0.5',
                                    width: '100%',
                                    marginLeft: '10px'
                                }}>
                                    <span style={{color: 'white', fontSize: '18px',}}>第{chapter.chapter}章</span>
                                    {/*{
                                        hidden ? <ExpandLessIcon sx={{color: '#fff'}} onClick={() => setHidden(false)}/>
                                            :<ExpandMoreIcon sx={{color: '#fff'}} onClick={() => setHidden(true)}/>
                                    }*/}
                                </div>
                            </Box>
                            <ul style={{marginLeft: '5px'}} hidden={hidden}>
                                {
                                    chapter && chapter.details.map((episode, epiIndex) => {
                                        return (
                                            <li
                                                style={{
                                                    alignItems: "center",
                                                    listStyle: 'none',
                                                    display: 'flex',
                                                    padding: '10px 12px',
                                                    backgroundColor: '#0f141a',
                                                    borderRadius: '20px',
                                                    marginBottom: '5px'
                                                }}
                                                onClick={() => handleIndexChange(cpIndex, epiIndex)}
                                                key={epiIndex}>
                                                <PlayCircleIcon sx={{
                                                    fontSize: '14px',
                                                    color: `${curCpIndex === cpIndex && curEpiIndex === epiIndex ? '#595DFD' : '#777'}`,
                                                    marginRight: '5px'
                                                }}/>
                                                <Typography sx={{
                                                    color: `${curCpIndex === cpIndex && curEpiIndex === epiIndex ? 'rgba(89,93,253,0.81)' : '#777'}`,
                                                    fontSize: '14px',

                                                    '&:hover': {
                                                        cursor: 'pointer',
                                                        transform: 'scale(1.01)',
                                                        color: '#595DFD',
                                                        transition: 'all .1s linear',
                                                    }
                                                }}>{episode.title}</Typography>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
        ;
}

export default Intro;