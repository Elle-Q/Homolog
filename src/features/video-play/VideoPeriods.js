import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {FixedSizeList} from 'react-window';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import videoList from '../../json/videoList.json'
import styled,{ keyframes} from "styled-components";

const spin = keyframes`
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
        
    `;

const StyledDiv = styled.div`
        width:10px;
        height:10px;
        background-color:#EB5E28;
        border-radius: 50%;
        box-shadow: 0 0 5px #EB5E28;
        animation: ${spin} 1s linear infinite;
`


function RenderRow(props) {
    const {data, index, style} = props;
    const {list, currentIndex, handleIndexChange} = data;
    const styles = {...style, right: '0px'};


    return (
        <ListItem style={styles} key={index} component="div" disablePadding>
            <ListItemButton onClick={() => handleIndexChange(index)}>
                {index === currentIndex ? <StyledDiv />:<></>}
                <ListItemText style={{
                    color: `${index === currentIndex ? 'text.primary' : '#CCC5B9'}`,
                    transform: `${index === currentIndex ? 'translate(15px) scale(1.1)' : 'scale(1)'}`,
                    transition: 'all 1s ease .2s'
                }}
                              primary={`P${index + 1}  
                              ${list[index].title}`}/>
                <ListItemText style={{textAlign: 'right', color: '#403D39'}} primary={`${list[index].duration}`}/>
            </ListItemButton>
        </ListItem>
    );
}

function VideoPeriods(props) {
    const {changeVideoSrc} = props;
    const [currentPlayIndex,setCerrentPlayIndex] = useState(1);

    const handleIndexChange = (selectedIndex) => {
        setCerrentPlayIndex(selectedIndex);
        changeVideoSrc(videoList[selectedIndex+1].src);
    }

    return (
        <Box
            sx={{
                width: '80%',
                height: 500,
                maxWidth: 360,
                borderRadius: '10px',
                backgroundColor: 'background.paper',
                boxShadow: '0 0 5px black',
                border: '1px solid #0a0908',
                // color:'#403D39'
            }}
        >
            <FixedSizeList
                height={500}
                width={360}
                itemSize={40}
                itemCount={videoList.length}
                overscanCount={5}
                itemData={{
                    list: videoList,
                    currentIndex: currentPlayIndex,
                    handleIndexChange: handleIndexChange
                }}
            >
                 {RenderRow}
            </FixedSizeList>
        </Box>
    );
}

export default VideoPeriods;