import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import {makeStyles} from "@mui/styles";
import {isVideo} from "../../../../utils/ToolUtil";
import SimplePlayer from "../../../../components/player/SimplePlayer";
import Box from "@mui/material/Box";


const useStyles = makeStyles({
    prev: {
        width: '1/4',
        maxHeight: '100px',
        cursor: "pointer",
        borderRadius: '5px',

        '&:hover': {
            filter: 'grayscale(90%)',
            transform: 'scale(1.1)',
            border: '1px solid white',
        }
    }
})

const fileShowContainer = {
    position: "relative",
    height: '100px',
    aspectRatio: '4/3',
    '&:hover': {
        filter: 'grayscale(90%)',
        transform: 'scale(1.1)',
        border: '1px solid white',
    }
}


function PrevShow(props) {
    const {preList} = props
    const classes = useStyles();
    const [currentPrev, setCurrentPrev] = useState();

    useEffect(() => {
        setCurrentPrev(preList && preList.length > 0 && preList[0])
    }, [preList])


    function handlePrevChange(prev, event) {
        setCurrentPrev(prev);
        let element = document.getElementById("prevList");
        for (let i = 0; i < element.children.length; i++) {
            element.children[i].style.border = '0px';
        }
        event.target.style.border = '2px solid white';
        event.target.style.borderRadius = '5px';
    }

    return (
        <React.Fragment>
            {
                currentPrev && isVideo(currentPrev.format) ? <SimplePlayer videoSrc={{
                        type: `${currentPrev.key ? 'application/x-mpegURL' : 'video/mp4'}`,
                        src: currentPrev.link
                    }}/> :
                    <div style={{width: '100%'}}>
                        <img src={currentPrev && currentPrev.link} alt='prevShow'
                             style={{
                                 width: 'auto',
                                 maxHeight: '650px',
                                 borderRadius: '25px',
                                 margin: '20px'
                             }}/>
                    </div>
            }

            <Stack id={"prevList"} direction={'row'} spacing={1} style={{justifyContent: "center", flexWrap: 'wrap'}}>
                {
                    preList && preList.map((prev, index) => {
                        return isVideo(prev.format) ?
                            <Box sx={fileShowContainer} onClick={(event) => handlePrevChange(prev, event)}>
                                <SimplePlayer videoSrc={{
                                    type: `${prev.key ? 'application/x-mpegURL' : 'video/mp4'}`,
                                    src: prev.link
                                }}/></Box>
                            :
                            <img src={prev.link} alt='smallPrev'
                                 key={'prev'.concat(index)}
                                 className={classes.prev}
                                 onClick={(event) => handlePrevChange(prev, event)}/>
                    })
                }
            </Stack>
        </React.Fragment>
    );
}

export default PrevShow;