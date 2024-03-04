import React, {useEffect, useState} from 'react';
import './carousel.scss'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from "@mui/material/IconButton";

function Carousel({children: slides, autoSlide = false}) {
    const [curr, setCurr] = useState(0)
    const [len, setLen] = useState(0)

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, 3000)
        return () => clearInterval(slideInterval);
    }, [slides]);

    const prev = () => {
        setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
    }

    const next = () => {
        setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
    }

    return (
        <div className="carousel-container">
            <div className="c-body" style={{transform: `translateX(-${curr * 100}%)`}}>
                {slides}
            </div>
            <div className="button-container">
                <IconButton onClick={prev}>
                    <ArrowBackIosIcon fontSize="large" className="icon"/>
                </IconButton>
                <IconButton onClick={next}>
                    <ArrowForwardIosIcon fontSize="large" className="icon"/>
                </IconButton>
            </div>
            <div className="c-footer">
                <div className="body">
                    {
                        slides.map((_, i) => (
                            <div className="slide-bar"
                                 style={{opacity: `${curr === i ? 1 : 0.5}`, padding: `${curr === i ? 5 : 0}px`}}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Carousel;