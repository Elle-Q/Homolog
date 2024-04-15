import React, {useEffect, useState} from 'react';
import './carousel.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from "@mui/material/IconButton";

function Carousel({slides = [], autoSlide = false}) {
    const [curr, setCurr] = useState(0)

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(next, 3000)
        return () => clearInterval(slideInterval);
    }, [slides]);

    const prev = () => {
        setCurr(curr === 0 ? slides.length - 1 : curr - 1);
    }

    const next = () => {
        setCurr(curr === slides.length - 1 ? 0 : curr + 1);
    }

    return (
        <div className="item-carousel-container">
            {slides && slides.map((slide, idx) => {
                return (
                    <img
                        src={slide.link}
                        alt="item-prev"
                        key={idx}
                        className={curr === idx ? "slide" : "slide slide-hidden"}
                    />
                );
            })}
            <IconButton onClick={prev} className="item-cr-icon left">
                <ArrowBackIosNewIcon fontSize="large" className="icon"/>
            </IconButton>
            <IconButton onClick={next} className="item-cr-icon right">
                <ArrowForwardIosIcon fontSize="large" className="icon"/>
            </IconButton>
        </div>
    );
}

export default Carousel;