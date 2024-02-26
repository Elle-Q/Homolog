import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getCarousel} from "../../../../../api/config.service";

function Carousel(props) {

    const [items, setItems] = useState([])
    useEffect(() => {
        getCarousel().then(resp => {
            setItems(resp);
        })
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        focusOnSelect: true,
        adaptiveHeight: true
    };

    return (
        <Slider {...settings}>
            {
                items.map((item, index) => (
                    <div key={index}>
                        <img style={{cursor: 'pointer', maxHeight: '270px', width: '100%'}}
                             key={index} src={item}
                             alt='carousel-item'
                        />
                    </div>
                ))
            }
        </Slider>
    );
}

export default Carousel;