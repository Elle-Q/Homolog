import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styled from "styled-components";
import "./cat-card.scss"
import {Link} from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 25px 10px 25px 0;
  background: rgb(65, 63, 63, 0.5);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.30);
  border-radius: 20px;
  width: 100%;

  & #img-container {
    width: 50px;
    height: 50px;
    background-color: rgb(201, 201, 201, 0.1);
    border-radius: 0 20px 20px 0;
    display: flex;
    justify-content: center;
    align-items: center
  }

  & #icon-wrapper {
    width: 30px;
    height: 20px;
    border: 1px solid rgba(89, 93, 253, 0.44);
    border-radius: 0 10px 0 0;
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

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;


const colors = [
    {fontColor: '#ff5d8f', bgColor: '#fae0e4', imgBgColor: '#ff99ac'},
    {fontColor: '#fdb833', bgColor: '#fffae5', imgBgColor: '#ffee99'},
    {fontColor: '#07beb8', bgColor: '#c4fff9', imgBgColor: '#68d8d6'},
    {fontColor: '#0077b6', bgColor: '#caf0f8', imgBgColor: '#00b4d8'},
    {fontColor: '#a06cd5', bgColor: '#f4effa', imgBgColor: '#c8b1e4'},
    {fontColor: '#ff8c42', bgColor: '#ffffff', imgBgColor: '#bfbdc1'},
];


function CatCard(props) {
    const {cat, index} = props;

    return (
        <StyledLink to={`/search?catId=${cat.id}`} key={cat.title} style={{width: '45%'}}>
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
        </StyledLink>
    );
}

export default CatCard;