import React, {useEffect} from 'react';
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {close, open, selectItemModal} from "../item-slice";
import {Link} from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 50%;
  height: 400px;
  margin-left: ${props => props.index % 2 == 0 ? 200 : 500}px;
  background-color: rgb(23, 23, 23, 0.6);
  margin-top: 80px;
  border-radius: 20px;
  box-shadow: 0 0 6px #413f3f;
  padding: 30px;

  &:hover > img {
    filter: grayscale(0);
    transform: rotate(0deg);
    transition: all 1s cubic-bezier(.175, .885, .32, 1.275);
  }
`

const FixedImg = styled.img`
  position: absolute;
  width: 40%;
  height: 55%;
  top: -60px;
  right: -40px;
  border-radius: 20px;
  filter: grayscale(1);
  transform: rotate(20deg);
  box-shadow: 0 0 15px #252422;
  border: 2px solid #252422;
`

const StudyButton = styled(Button)({
    color: 'white',
    backgroundColor: '#00a896',
    opacity: 0.2,
    fontSize: '12px',
    padding: '1px 8px',
    fontWeight: 'bold',
    marginRight: '5px',
    '&:hover': {
        opacity: 1,
        backgroundColor: '#00a896',
    }
})

const BuyButton = styled(Button)({
    color: 'white',
    backgroundColor: '#727270',
    opacity: 0.2,
    fontSize: '12px',
    padding: '1px 8px',
    fontWeight: 'bold',
    marginRight: '5px',
    '&:hover': {
        opacity: 1,
        backgroundColor: '#ff0a54',
        border: 'none'
    }
})

function ChapterCard(props) {

    const {chapter, index} = props
    const dispatch = useDispatch();
    const {item} = useSelector(selectItemModal)

    return (
        <Container index={index}>
            <FixedImg alt={'listImg'}
                      src={chapter.Main}>
            </FixedImg>
            <Stack spacing={1} justifyContent="center">
                {
                    chapter.Episodes.map((episode, index) => {
                        return <Typography variant="h7" key={index} color='#fff' sx={{
                            display: 'flex',
                            alignItems: 'end',

                            '&:hover': {
                                cursor: 'pointer',
                                boxShadow: '0 0 1px #ff7096',
                                borderRadius: '5px',
                                backgroundColor: 'rgba(232,41,134,0.1)',
                                '& > Button': {
                                    opacity: 0.8,
                                    boxShadow: '0 0 2px #00a896',
                                },
                                '& > span': {
                                    color: '#e82986',
                                }
                            },
                        }}>
                            <span style={{marginLeft: '5px', color: '#8a2846', overflow: 'hidden', width: '300px'}}>{episode.Name}</span>
                            {/*前两个课时内容免费, 跳转播放页面， 否则打开购物车提示购买*/}
                            {
                                index < 2 ?
                                    <Link to={`/app/play/${item.ID}`} style={{color: '#EB5E28'}}>
                                        <StudyButton>学习观看</StudyButton>
                                    </Link> :
                                    <BuyButton onClick={() => dispatch(open())}>立即购买</BuyButton>
                            }
                            <span>13:35:34</span>
                        </Typography>
                    })
                }

            </Stack>
        </Container>
    );
}

export default ChapterCard;