import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Link, useParams} from "react-router-dom";
import items from "../../../json/items.json";
import PriceTag from "../../../common/price-tag";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ByAuthor from "../../../common/by-author";
import {alpha} from "@mui/system";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {getStarIcons} from "../../../utils/ToolUtil";
import styled from "styled-components";
import PageTipFloatingBar from "../../../common/page-tip-floating-bar";
import AirplayIcon from '@mui/icons-material/Airplay';

const StyledDiv = styled.div`
        width: 100%;
        min-height: 50px;
        background-color: rgba(19,47,76,0.2);
        border-radius: 10px;
        margin-top:20px;
        text-align: center;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#e9c46a;
`

function Item() {
    let params = useParams();
    let item = items[params.id - 1];
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
                    <img src={`${item.imgSrc}`} alt='bg1'
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
                        <PriceTag height={56}/>
                        <Typography variant="h4"
                                    component="div"
                                    color="secondary.main"
                                    sx={{mt: '5px', ml: '15px'}}>
                            {item.name}
                        </Typography>

                        <ByAuthor/>

                        <Typography variant="h8"
                                    component="div"
                                    color="secondary.main"
                                    sx={{mt: '5px', ml: '15px'}}>
                            描述
                        </Typography>
                        <p style={{color: "rgba(51,153,255,0.7)", marginLeft: '4px'}}>
                            An invisible connection system; a mystical portal between Illustrator and After Effects.

                            Transfer shapes as you need them without importing, converting or redrawing. The vector
                            workflow you
                            imagined between apps created by the same company.

                            Work with shapes, not files.
                            An invisible connection system; a mystical portal between Illustrator and After Effects.

                            Transfer shapes as you need them without importing, converting or redrawing. The vector
                            workflow you
                            imagined between apps created by the same company.

                            Work with shapes, not files.
                            An invisible connection system; a mystical portal between Illustrator and After Effects.

                            Transfer shapes as you need them without importing, converting or redrawing. The vector
                            workflow you
                            imagined between apps created by the same company.

                            Work with shapes, not files.
                            An invisible connection system; a mystical portal between Illustrator and After Effects.

                            Transfer shapes as you need them without importing, converting or redrawing. The vector
                            workflow you
                            imagined between apps created by the same company.

                            Work with shapes, not files.
                            An invisible connection system; a mystical portal between Illustrator and After Effects.

                            Transfer shapes as you need them without importing, converting or redrawing. The vector
                            workflow you
                            imagined between apps created by the same company.

                            Work with shapes, not files.
                        </p>
                    </Stack>
                </Grid>

                <Grid item xs={4} style={{marginTop: '40px', marginLeft: '40px',}}>
                    <Typography variant="h5"
                                component="button"
                                color="white"
                                sx={{
                                    width: '100%',
                                    height: '50px',
                                    backgroundColor: "red",
                                    border: '1px solid red',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 5px #EB5E28',
                                    '&:hover': {
                                        backgroundColor: alpha('#132f4c', 0.2),
                                        boxShadow: '0 0 5px #001E3C',
                                        fontSize: '30px',
                                        border: "none",
                                        cursor: "pointer",
                                        color: "red",
                                        '& *': {
                                            transform: 'scale(1.1)',
                                            transition: 'transform 0.4s ease-in-out',
                                        }
                                    }
                                }}>
                        <ShoppingCartIcon sx={{marginLeft: '10px'}} fontSize="large"/>
                    </Typography>

                    <StyledDiv>
                        <Link to={`/app/play`} style={{ color: '#EB5E28'}}>
                            <AirplayIcon> </AirplayIcon>
                        </Link>
                    </StyledDiv>

                    <StyledDiv>
                        {getStarIcons(4.5)}
                    </StyledDiv>

                    <StyledDiv style={{color: "#CCC5B9", padding: '10px'}}>
                        侵权不删 爱咋咋
                        <br/>
                        随浪随风飘荡
                        <br/>
                        随著一生里的浪
                        <br/>
                        你我在重叠那一刹
                        <br/>
                        顷刻各在一方
                        <br/>
                        缘份随风飘荡
                        <br/>
                        随著一生里的浪
                        <br/>
                        缘尽此生也守望
                        <br/>
                        你我在重望那一刹
                        <br/>
                        心中有泪飘降
                    </StyledDiv>
                </Grid>
            </Grid>

            <PageTipFloatingBar/>
        </Box>
    );
}

export default Item;