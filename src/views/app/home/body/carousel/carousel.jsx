import React, {useEffect, useState} from 'react';
import './carousel.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from "@mui/material/IconButton";

function Carousel({children: slides, autoSlide = false, showDots = true}) {
    const [curr, setCurr] = useState(0)

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
            <div className="c-body" style={{
                transform: `translateX(-${curr * 100}%)`,
            }}>
                {slides}
            </div>
            <IconButton onClick={prev} className="c-icon-container left">
                <ArrowBackIosNewIcon fontSize="large" className="icon"/>
            </IconButton>
            <IconButton onClick={next} className="c-icon-container right">
                <ArrowForwardIosIcon fontSize="large" className="icon"/>
            </IconButton>
            {
                showDots &&
                <div className="c-footer">
                    <div className="body">
                        {
                            slides && slides.map((_, i) => (
                                <div className="slide-bar"
                                     key={i}
                                     style={{opacity: `${curr === i ? 1 : 0.5}`, padding: `${curr === i ? 5 : 0}px`}}/>
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    );
}

export default Carousel;