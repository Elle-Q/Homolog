import React, {useEffect, useState} from 'react';
import {isVideo} from "../../../../utils/ToolUtil";
import PlayImg from '../../../../assets/images/play_img.jpg'
import Carousel from "../carousel/carousel";
import './prev-show.scss'
import {getCurrentEffect} from "../../../../api/config.service";

function PrevCard(props) {
    const {prev} = props
    const [zoomShow, setZoomShow] = useState(false)

    const handleClose = (e) => {
        setZoomShow(false);
    }

    return (
        <div className="item-prev-container"
             onMouseOver={() => setZoomShow(true)}
             onMouseOut={handleClose}
        >
            <img alt='smallPrev' src={`${isVideo(prev.format) ? PlayImg : prev.link}`}/>
            <div className="zoom-container" hidden={!zoomShow}>
                <img alt='smallPrev' src={prev.link}/>
            </div>
        </div>
    )
}

function PrevShow(props) {
    const {preList} = props
    const [currentPrev, setCurrentPrev] = useState();

    useEffect(() => {
        setCurrentPrev(preList && preList.length > 0 && preList[0]);

    }, [preList])

    return (
        <React.Fragment>
            <Carousel slides={preList}></Carousel>
            <div id="prevList">
                {
                    preList && preList.map((prev, index) => (
                        <PrevCard prev={prev} key={index}/>
                    ))
                }
            </div>
        </React.Fragment>
    );
}

export default PrevShow;