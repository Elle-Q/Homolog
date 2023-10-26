import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {StyledLink} from "../../../../components/styled/StyledComponent";
import {useTheme} from "@mui/material/styles";
import {alpha} from "@mui/system";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 35px 30px 35px 0;
  background: rgba(0, 0, 0, 0.30);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.30);
  border-radius: 20px;
  min-width: 373px;
  min-height: 154px;

  & #img-container {
    width: 100px;
    height: 80px;
    background-color: #00a896;
    border-radius: 0 20px 20px 0;
    display: flex;
    justify-content: center;
    align-items: center
  }

  & #icon-container {
    width: 40px;
    height: 30px;
    border: 1px solid rgba(0, 168, 150, 0.40);
    border-radius: 0 10px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    & #img-container {
      background-color: #EB5E28;
      & img {
        transform:scale(1.15);
      }
    }
    
    & #icon-container {
      background-color: #EB5E28;
      border-color: #EB5E28;
    }
    
    & #icon {
      color: black;
    }
  }
`


function CatCard(props) {
    const theme = useTheme();
    const {item} = props;

    return (
        <StyledLink to={`/app/category/${item.ID}`} key={item.Title}>
            <Container>
                <div id='img-container'>
                    <img
                        src={item.Preview}
                        alt={item.Title}
                        style={{
                            width: '36px',
                            height: '36px',
                            transition: 'all 500ms ease',
                        }}>
                    </img>
                </div>
                <div style={{
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '20px',
                    flexWrap: "wrap",
                    justifyContent: 'center'
                }}>
                    <h5 style={{
                        fontSize: '18px',
                        color: 'rgba(255,255,255,1)',
                        margin: '0',
                    }}>{item.Title}</h5>

                    <Typography color={alpha(theme.palette.primary.contrastText, 0.75)} sx={{fontSize: '12px'}}>
                        {item.SubTitle}
                    </Typography>

                    <Typography color={alpha(theme.palette.primary.contrastText, 0.75)} sx={{fontSize: '12px'}}>
                        300+
                    </Typography>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <div  id="icon-container">
                        <KeyboardArrowRightIcon id = 'icon' sx={{color:'#00a896'}}/>
                    </div>
                </div>
            </Container>
        </StyledLink>
    );
}

export default CatCard;