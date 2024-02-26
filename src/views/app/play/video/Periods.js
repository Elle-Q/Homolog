import React, {useState} from 'react';
import Box from "@mui/material/Box";
import styled, {keyframes} from "styled-components";
import {useSelector} from "react-redux";
import {selectPlayer} from "../playSlice";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

const StyledDiv = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 5px;
  background-color: #ff0a54;
  border-radius: 50%;
  box-shadow: 0 0 5px #ff477e;
  animation: ${spin} 1s cubic-bezier(.175, .885, .32, 1.275) infinite;
`

const renderEpisodes = (chapter) => {

    /*<ListItem style={styles} key={index} component="div" disablePadding>
        <ListItemButton sx={{
            borderRadius: '10px',
            '&:hover': {
                transform: 'translateX(5px) ',
                transition: 'all 1s cubic-bezier(.175,.885,.32,1.275)'
            }
        }} onClick={() => handleIndexChange(index)}>
            {index === currentIndex ? <StyledDiv/> : <></>}
            <ListItemText sx={{
                color: `${index === currentIndex ? '#ff5c8a' : '#dad6d3'}`,
                transform: `${index === currentIndex ? 'translateX(15px) scale(1.1)' : 'scale(1)'}`,
                transition: 'all 1s cubic-bezier(.175,.885,.32,1.275)',
                "& .MuiTypography-root": {
                    fontFamily: 'cursive',
                }
            }}
                          primary={`P${index + 1}  ${list[index].Name}`}
            />
        </ListItemButton>
    </ListItem>*/
}

function Periods(props) {
    const {changeVideoSrc} = props;
    const [curCpIndex, setCurCpIndex] = useState(0);
    const [curEpiIndex, setCurEpiIndex] = useState(0);
    const {chapters} = useSelector(selectPlayer);

    const handleIndexChange = (cpIndex, epiIndex) => {
        setCurCpIndex(cpIndex);
        setCurEpiIndex(epiIndex);
        changeVideoSrc(chapters[cpIndex].Episodes[epiIndex].QnLink);
    }

    return (
        <div style={{overflow:'auto',maxHeight:'800px'}}>
            {
                chapters && chapters.map((chapter, cpIndex) => {
                    return (
                        <React.Fragment>
                            <Box display={"flex"} sx={{width: '300px', marginBottom: '10px'}}>
                                <div style={{height: '30px', width: '5px', backgroundColor: "#ff0a54"}}></div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    opacity: '0.5',
                                    width: '100%',
                                    backgroundSize: '100%',
                                    backgroundImage: `url("http://www.leetroll.com/config/default_bg/bg5.jpg")`
                                }}>
                                    <span style={{color: 'white'}}>第{chapter.Chapter}章</span>
                                </div>
                            </Box>
                            <Stack sx={{marginBottom: '50px'}} spacing={1}>
                                {
                                    chapter && chapter.Episodes.map((episode, epiIndex) => {
                                        return (
                                            <Box display={"flex"} sx={{alignItems: "center"}} onClick={()=>handleIndexChange(cpIndex, epiIndex)}>
                                                { curCpIndex === cpIndex && curEpiIndex === epiIndex && <StyledDiv/>}
                                                <Typography sx={{
                                                    marginLeft: '15px',
                                                    color: `${curCpIndex === cpIndex && curEpiIndex === epiIndex ? '#ff5c8a':'#dad6d3'}`,
                                                    fontFamily: 'cursive',
                                                    '&:hover': {
                                                        cursor:'pointer',
                                                        transform: 'scale(1.1)',
                                                        transition: 'all 1s cubic-bezier(.175,.885,.32,1.275)',
                                                    }
                                                }}>{episode.Name}</Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </Stack>
                        </React.Fragment>
                    )
                })
            }
        </div>
    );
}

export default Periods;