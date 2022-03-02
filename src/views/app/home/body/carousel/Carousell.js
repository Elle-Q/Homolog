import React, {useEffect, useRef, useState} from 'react';
import ImageCard from "./ImageCard";
import Box from "@mui/material/Box";
import styled from 'styled-components';
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import {ListCat} from "../../../../../api/cat.service";

const Button = styled.div`
  position: absolute;
  z-index: 3;
  cursor: pointer;
  left:${props => props.side === 'prev' && 5}px;
  right:${props => props.side === 'next' && 15}px;
  transition: all .3s cubic-bezier(.23,1.5,.32,1);
  width:10px;
  height:10px;
`;

const DotIndex = styled.div` {
  background-color:'red';
  display: flex;
  height:10px;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

function Carousell() {

    const [index, setIndex] = useState(0);
    const [moveWidth, setMoveWidth] = useState(0);
    const [isLeftSlide, setIsLeftSlide] = useState(false);
    const [cats, setCats] = useState([]);

    React.useEffect(() => {
        ListCat().then((data) => {
            setCats(data)
        })
    }, [])


    const handleClickNext = () => {
        if (index === cats.length-4) {
            return;
        }
        setMoveWidth(moveWidth - 300);
        setIndex(index + 1);
    }

    const handleClickPrev = () => {
        setMoveWidth(moveWidth + 300);
        setIndex(index - 1);
    }

    let handleAutoLeftplay;
    let handleAutoRightplay;

    useEffect(() => {
        if (!isLeftSlide) {
            handleAutoRightplay = setInterval(handleClickNext, 3000);
            if (index === cats.length-4) {
                setIsLeftSlide(true);
            }
        }
        if (isLeftSlide) {
            handleAutoLeftplay = setInterval(handleClickPrev, 3000);
            if (index === 0) {
                setIsLeftSlide(false);
            }
        }
        return () => {
            clearInterval(handleAutoRightplay);
            clearInterval(handleAutoLeftplay)
        }
    }, [handleClickNext])


    const getDots = () => {
        const dots = [];
        for (let i = 0; i < cats.length; i++) {
            if (index === i) {
                dots.push(<CircleRoundedIcon key={i} sx={{width: '10px', height: '10px', ml: '5px'}}/>)
            } else {
                dots.push(<CircleOutlinedIcon key={i} sx={{width: '10px', height: '10px', ml: '5px'}}/>)
            }
        }
        return dots;
    }

    return (
        <React.Fragment>

            <Box sx={{
                width:'1200px', //fixme: do with screen size
                mt: '15px',
                padding: '0px 15px 5px 15px',
                boxShadow: 10,
                textShadow: 10,
                borderRadius: 3,
                borderColor: 'red',
                border: '1px solid #173A5E',
                backgroundColor: 'primary.main',
                position: 'relative', //very important. fuck
                display: 'flex',
                alignItems: 'center',
                flexWrap: "nowrap",
                overflow: "hidden",
                justifyContent: "space-between",
            }}>

                <Button side="prev" onClick={handleClickPrev}>
                    <KeyboardArrowLeftRoundedIcon/>
                </Button>

                {
                    cats.map((item, i) => (
                        <ImageCard key={i} item={item} width={moveWidth}/>
                    ))
                }

                <Button side="next" onClick={handleClickNext}>
                    <KeyboardArrowRightRoundedIcon/>
                </Button>

            </Box>

            <DotIndex>
                {getDots()}
            </DotIndex>

        </React.Fragment>

    )

}

export default Carousell;