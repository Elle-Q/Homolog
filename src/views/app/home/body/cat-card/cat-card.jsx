import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styled from "styled-components";
import "./cat-card.scss"
import {Link} from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 2.5rem 1rem 2.5rem 0;
  background-color: rgba(15, 20, 26, 0.64);
  box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.30);
  border-radius: 2rem;
  width: 100%;

  & #img-container {
    padding: 1rem;
    background-color: #1C2129;
    border-radius: 0 2rem 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center
  }

  & #icon-wrapper {
    width: 3rem;
    height: 2rem;
    border: .1rem solid rgba(89, 93, 253, 0.44);
    border-radius: 0 1rem 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background: ${props => props.colors.bgColor};

    & #img-container {
      background-color: ${props => props.colors.imgBgColor};

      & img {
        transform: scale(1.15);
      }
    }

    & #icon-wrapper {
      background-color: ${props => props.colors.imgBgColor};
      border-color: ${props => props.colors.imgBgColor};
    }

    & #icon {
      color: ${props => props.colors.fontColor};
    }

    & #catName {
      color: ${props => props.colors.fontColor};
    }

  }
`

const colors = [
    {fontColor: '#ff5d8f', bgColor: '#fae0e4', imgBgColor: '#ff99ac'},
    {fontColor: '#fdb833', bgColor: '#fffae5', imgBgColor: '#ffee99'},
    {fontColor: '#07beb8', bgColor: '#B4F8F0', imgBgColor: '#59d2d0'},
    {fontColor: '#0077b6', bgColor: '#caf0f8', imgBgColor: '#00b4d8'},
    {fontColor: '#a06cd5', bgColor: '#f4effa', imgBgColor: '#c8b1e4'},
    {fontColor: '#ff8c42', bgColor: '#fdefef', imgBgColor: '#bfbdc1'},
];


function CatCard(props) {
    const {cat, index} = props;

    return (
        <Link to={`/search?catId=${cat.id}`} key={cat.title} style={{width: '45%'}}>
            <Container colors={colors[index]}>
                <div id='img-container'>
                    <img
                        src={cat.icon}
                        alt={cat.title}>
                    </img>
                </div>
                <div className="text-container">
                    <span id="catName" className="title">{cat.title}</span>
                    <span>{cat.subTitle}</span>
                    <span>300+ </span>
                </div>
                <div className="icon-container">
                    <div id="icon-wrapper">
                        <KeyboardArrowRightIcon id='icon'/>
                    </div>
                </div>
            </Container>
        </Link>
    );
}

export default CatCard;