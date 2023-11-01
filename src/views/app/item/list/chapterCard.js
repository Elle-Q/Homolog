import React from 'react';
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {close, open} from "../item-slice";
import {Link} from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 50%;
  height: 400px;
  margin-left: 200px;
  background-color: rgba(0, 168, 150, 0.2);
  margin-top: 80px;
  border-radius: 20px;
  box-shadow: 0 0 6px #00a896;
  padding: 30px;

  &:hover > img {
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
    '&:hover': {
        opacity: 1,
        backgroundColor: '#00a896',
    }
})

const BuyButton = styled(Button)({
    color: 'white',
    backgroundColor: '#252422',
    opacity: 0.2,
    fontSize: '12px',
    padding: '1px 8px',
    fontWeight: 'bold',
    '&:hover': {
        opacity: 1,
        backgroundColor: 'red',
    }
})

function ChapterCard(props) {

    const {chapter} = props
    const dispatch = useDispatch();



    return (
        <Container>
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
                                boxShadow: '0 0 1px #00a896',
                                borderRadius: '5px',
                                backgroundColor: 'rgba(0, 168, 150, 0.1)',
                                '& > Button': {
                                    opacity: 0.8,
                                    boxShadow: '0 0 2px #00a896',
                                }
                            },
                        }}>
                            <span style={{marginLeft: '5px', overflow: 'hidden', width: '300px'}}>{episode.Name}</span>
                            {/*前两个课时内容免费, 跳转播放页面， 否则打开购物车提示购买*/}
                            {
                                index < 2 ?
                                    <Link to={`/app/play/${chapter.ID}`} style={{color: '#EB5E28'}}>
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