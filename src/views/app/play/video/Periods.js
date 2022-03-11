import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {FixedSizeList} from 'react-window';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import styled, {keyframes} from "styled-components";
import {useTheme} from '@mui/material/styles';
import blurBg from "../../../../assets/bg/blur5.jpg";

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
  background-color: #EB5E28;
  border-radius: 50%;
  box-shadow: 0 0 5px #EB5E28;
  animation: ${spin} 1s linear infinite;
`


function RenderRow(props) {
    const {data, index, style} = props;
    const {list, currentIndex, handleIndexChange} = data;
    const styles = {...style, width:'96%', right: '0px', paddingTop:'10px'};

    return (
        <ListItem style={styles} key={index} component="div" disablePadding>
            <ListItemButton sx={{borderRadius:'10px'}} onClick={() => handleIndexChange(index)}>
                {index === currentIndex ? <StyledDiv/> : <></>}
                <ListItemText style={{
                    color: `${index === currentIndex ? 'text.primary' : '#CCC5B9'}`,
                    transform: `${index === currentIndex ? 'translate(15px) scale(1.1)' : 'scale(1)'}`,
                    transition: 'all 1s ease .2s'
                }}
                    primary={`P${index + 1}  ${list[index].Name}`}
                />
                {/*<ListItemText style={{textAlign: 'right', color: '#403D39'}} primary={`${list[index].Bucket}`}/>*/}
            </ListItemButton>
        </ListItem>
    );
}

function Periods(props) {
    const theme = useTheme();
    const {changeVideoSrc, periods} = props;
    const [currentPlayIndex, setCerrentPlayIndex] = useState(0);

    const handleIndexChange = (selectedIndex) => {
        setCerrentPlayIndex(selectedIndex);
        changeVideoSrc(periods[selectedIndex].QnLink);
    }

    if (periods.length < 1) return <></>

    return (
        <Box
            sx={{
                ml:'50px',
                display:"flex",
                height: 500,
                maxWidth: 360,
                borderRadius: '10px',
                // backgroundColor: alpha(theme.palette.background.paper,0.4),
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${blurBg})`,
                boxShadow: '0 0 5px black',
            }}
        >
            <FixedSizeList
                height={500}
                width={360}
                itemSize={40}
                itemCount={periods.length}
                overscanCount={5}
                itemData={{
                    list: periods,
                    currentIndex: currentPlayIndex,
                    handleIndexChange: handleIndexChange
                }}
            >
                {RenderRow}
            </FixedSizeList>
        </Box>
    );
}

export default Periods;