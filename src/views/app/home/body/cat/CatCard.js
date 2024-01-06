import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {StyledLink} from "../../../../../components/styled/StyledComponent";
import {useTheme} from "@mui/material/styles";
import {alpha} from "@mui/system";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 35px 30px 35px 0;
  background: rgb(65, 63, 63, 0.5);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.30);
  border-radius: 20px;
  min-width: 373px;
  min-height: 154px;

  & #img-container {
    width: 100px;
    height: 80px;
    background-color: rgb(201, 201, 201, 0.1);
    border-radius: 0 20px 20px 0;
    display: flex;
    justify-content: center;
    align-items: center
  }

  & #icon-container {
    width: 40px;
    height: 30px;
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

    & #icon-container {
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
    {fontColor: '#07beb8', bgColor: '#c4fff9', imgBgColor: '#68d8d6'},
    {fontColor: '#0077b6', bgColor: '#caf0f8', imgBgColor: '#00b4d8'},
    {fontColor: '#a06cd5', bgColor: '#f4effa', imgBgColor: '#c8b1e4'},
    {fontColor: '#ff8c42', bgColor: '#ffffff', imgBgColor: '#bfbdc1'},
];


function CatCard(props) {
    const {cat, index} = props;

    return (
        <StyledLink to={`/app/category/${cat.id}`} key={cat.title}>
            <Container colors={colors[index]}>
                <div id='img-container'>
                    <img
                        src={cat.icon}
                        alt={cat.title}
                        style={{
                            width: '50px',
                            height: '50px',
                            transition: 'all 500ms ease',
                        }}>
                    </img>
                </div>
                <div style={{
                    height: '90px',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '20px',
                    flexWrap: "wrap",
                    justifyContent: 'center'
                }}>
                    <Typography id="catName" sx={{
                        fontSize: '22px',
                        color: 'white',
                        margin: '0',
                        fontWeight: 'bold'
                    }}>{cat.title}</Typography>

                    <Typography color={alpha('#CCC5B9', 0.75)} sx={{fontSize: '16px'}}>
                        {cat.subTitle}
                    </Typography>

                    <Typography color={alpha('#bbb8b6', 0.75)} sx={{fontSize: '16px'}}>
                        300+
                    </Typography>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <div id="icon-container">
                        <KeyboardArrowRightIcon id='icon' sx={{color: '#595DFD'}}/>
                    </div>
                </div>
            </Container>
        </StyledLink>
    );
}

export default CatCard;