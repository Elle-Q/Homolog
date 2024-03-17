import React, {useEffect, useState} from 'react';
import {isVideo} from "../../../../utils/ToolUtil";
import SimplePlayer from "../../../../components/player/SimplePlayer";
import Carousel from "../../home/body/carousel/carousel";
import PlayImg from '../../../../assets/images/play_img.jpg'

function PrevShow(props) {
    const {preList} = props
    const [currentPrev, setCurrentPrev] = useState();

    useEffect(() => {
        setCurrentPrev(preList && preList.length > 0 && preList[0]);

    }, [preList])


    function handlePrevChange(prev, event) {
        setCurrentPrev(prev);
        let prevs = document.getElementsByClassName("prev");
        for (let i = 0; i < prevs.length; i++) {
            prevs[i].style.border = '0px';
        }
        event.target.style.border = '1px solid white';
        event.target.style.borderRadius = '5px';
    }

    return (
        <React.Fragment>
            {
                currentPrev && isVideo(currentPrev.format) ?
                    <SimplePlayer
                        videoSrc={{
                            type: `${currentPrev.key ? 'application/x-mpegURL' : 'video/mp4'}`,
                            src: currentPrev.link
                        }}/> :
                    <div>
                        <img src={currentPrev && currentPrev.link}
                             alt='prevShow'
                             style={{
                                 maxWidth: '100%',
                                 borderRadius: '25px',
                             }}/>
                    </div>
            }
            <div id="prevList">
                <Carousel showDots={false}>
                    {
                        preList && preList.map((prev, index) => (
                            <img alt='smallPrev'
                                 src={`${isVideo(prev.format) ? PlayImg : prev.link}`}
                                 key={index}
                                 className="prev"
                                 onClick={(event) => handlePrevChange(prev, event)}/>
                        ))
                    }
                </Carousel>
            </div>
            {/* <Stack id={"prevList"} direction={'row'} spacing={1} style={{justifyContent: "center", flexWrap: 'wrap'}}>
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
            </Stack>*/}
        </React.Fragment>
    );
}

export default PrevShow;