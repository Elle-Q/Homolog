import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import img from '../../../assets/cat_animate3-2.gif'
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import tags from '../../../json/popTags.json';
import Button from "@mui/material/Button";
import SideBar from "./SideBar/SideBar";
import items from "../../../json/items.json";
import CategoryCard from "../home/body/subject/CategoryCard";
import {useParams} from "react-router-dom";
import {GetCat} from "../../../api/cat.service";
import {getPopularTags} from "../../../utils/ToolUtil";

function Category(props) {

    let params = useParams();
    let id = params.id;
    const [category, setCategory] = useState({});

    useEffect(() => {
        GetCat(id).then((data) => {
            setCategory(data)
        })
    }, [])


    return (
        <React.Fragment>
            <Grid container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  columnSpacing={{xs: 1, sm: 2, md: 3}}
                  sx={{backgroundColor: 'secondary.main'}}
            >
                <Grid item xs={6} style={{textAlign: "right", marginTop: '50px'}}>
                    <img src={category.PageImg} alt='category' style={{
                        maxWidth:'600px'
                        // width: '80%',
                    }}/>
                </Grid>
                <Grid item xs={6} >
                    <Typography component="h2"
                                color="primary.dark"
                                sx={{
                                    fontFamily: 'cursive',
                                    fontSize: '25px',
                                    mt: '100px',
                                    mb: '20px',
                                    display: "block"
                                }}>
                        {category.Title}
                    </Typography>
                    <Typography variant="h1"
                                component="h1"
                                color="secondary.light"
                                sx={{
                                    fontFamily: 'cursive',
                                    fontSize: '44px',
                                    marginRight: '45%',
                                    lineHeight: '1.1em'
                                }}>
                        {category.Desc}
                    </Typography>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <Divider variant="middle"/>
                    {getPopularTags(tags, '热门标签:')}
                </Grid>
                <Grid item xs={2}/>
            </Grid>

            <Box sx={{
                width: '70%',
                ml: '15%',
                mr: '15%',
                borderRadius: '10px',
                backgroundColor: "transparent",
                display:"flex",
                mt:'40px',
            }}>
                <SideBar/>
                <Grid container
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={1}
                      sx={{
                          marginLeft:'20px',
                          flexWrap:"wrap"
                      }}
                >
                        {/*{*/}
                        {/*    items.map((item, index) => {*/}
                        {/*        return (*/}
                        {/*            <Grid item xs={4}>*/}
                        {/*                <CategoryCard width={290} key={index} {...item}/>*/}
                        {/*            </Grid>*/}
                        {/*        )*/}
                        {/*    })*/}
                        {/*}*/}
                </Grid>
            </Box>

        </React.Fragment>
    );
}

export default Category;