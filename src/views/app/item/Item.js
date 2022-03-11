import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Link, useParams} from "react-router-dom";
import items from "../../../json/items.json";
import PriceTag from "../../../components/PriceTag";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ByAuthor from "../../../components/ByAuthor";
import {alpha} from "@mui/system";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {getStarIcons} from "../../../utils/ToolUtil";
import styled from "styled-components";
import PageTipFloatingBar from "../../../components/PageTipFloatingBar";
import AirplayIcon from '@mui/icons-material/Airplay';
import {GetItem, GetItemFiles} from "../../../api/item.service";
import {BigLinkButton, CartButton} from "../../../components/ui/CustomButton";
import {useDispatch} from "react-redux";
import {setItemId} from "../play/playSlice";

const StyledDiv = styled.div`
  width: 100%;
  min-height: 50px;
  background-color: rgba(19, 47, 76, 0.2);
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e9c46a;
`

function Item(props) {
    let params = useParams();
    let id = params.id;
    const dispatch = useDispatch();
    const [item, setItem] = useState({});

    useEffect(() => {
        const fetch = async () => {
            await GetItem(id).then((data) => {
                setItem(data)
                dispatch(setItemId(data.ID))
            })
        }
        fetch().catch()
    }, [])

    return (
        <Box sx={{
            width: '60%',
            ml: '20%',
            mr: '20%',
            borderRadius: '10px',
            mt: '20px',
            boxShadow: '0 0 5px black',
            backgroundColor: "#0a0908",
        }}>
            <Grid container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
            >
                <Grid item style={{textAlign: "center"}} xs={12}>
                    <img src={`${item.Preview}`} alt='bg1'
                         style={{
                             maxWidth: '1000px',
                             borderRadius: '3px'
                         }}/>
                </Grid>

                <Grid item xs={7} style={{marginLeft: "20px"}}>
                    <Stack direction='column'
                           spacing={2}
                           sx={{mt: '10px'}}
                    >
                        <PriceTag height={56} price={item.Price}/>
                        <Typography variant="h4"
                                    component="div"
                                    color="secondary.main"
                                    sx={{mt: '5px', ml: '15px'}}>
                            {item.Name}
                        </Typography>

                        <ByAuthor author={item.Author}/>

                        <Typography variant="h8"
                                    component="div"
                                    color="secondary.main"
                                    sx={{mt: '5px', ml: '15px'}}>
                            描述
                        </Typography>
                        <p style={{color: "rgba(51,153,255,0.7)", marginLeft: '4px'}}>
                            {item.Desc}
                        </p>
                    </Stack>
                </Grid>

                <Grid item xs={4} style={{marginTop: '40px', marginLeft: '40px',}}>

                    <CartButton icon={<ShoppingCartIcon sx={{marginLeft: '10px'}} fontSize="large"/>}/>
                    <BigLinkButton icon={<AirplayIcon/>} linkTo={`/app/play/${item.ID}`}/>
                    <StyledDiv>
                        {getStarIcons(item.Scores)}
                    </StyledDiv>

                    <StyledDiv style={{color: "#CCC5B9", padding: '10px'}}>
                        假如时光已逝
                        <br/>
                        鸟儿不再歌唱
                        <br/>
                        风儿也吹倦了
                        <br/>
                        那就用黑暗的厚幕把我盖上
                        <br/>
                        如同黄昏时节你用睡眠的衾被裹住大地
                        <br/>
                        又轻轻合上睡莲的花瓣
                        <br/>
                        路途未完 行囊已空
                        <br/>
                        衣裳破裂污损 人已精疲力竭
                        <br/>
                        你驱散了旅客的羞愧和困窘
                        <br/>
                    </StyledDiv>
                </Grid>
            </Grid>

            <PageTipFloatingBar/>
        </Box>
    );
}

export default Item;