import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import img from '../../assets/cat_animate3-2.gif'
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import tags from '../../json/popTags.json';
import Button from "@mui/material/Button";
import SideBar from "../../features/subject/SideBar";
import items from "../../json/items.json";
import CategoryCard from "../../features/subject/CategoryCard";

function Category(props) {

    function getPopularTags() {
        return (
            <React.Fragment>
                <span style={{marginLeft: '50px', marginRight: '10px'}}>热门标签:</span>
                {
                    tags.map((k, index) => {
                        return (
                            <Button key={index} sx={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: '#CCC5B9',
                                mr: '15px',
                                '&::before': {
                                    content: `'🏷'`,
                                },
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    transition: 'all .2s ease  ',
                                    color: '#3399FF'
                                }
                            }}><span style={{marginLeft: '5px', fontSize: '14px'}}> {k.name}({k.cnt})</span></Button>
                        )
                    })
                }
            </React.Fragment>
        );
    }

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
                    <img src={img} alt='category' style={{
                        maxWidth:'600px'
                        // width: '80%',
                    }}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography component="h2"
                                color="primary.dark"
                                sx={{
                                    fontFamily: 'cursive',
                                    fontSize: '25px',
                                    mt: '100px',
                                    mb: '20px',
                                    display: "block"
                                }}>
                        动画
                    </Typography>
                    <Typography variant="h1"
                                component="h1"
                                color="secondary.light"
                                sx={{
                                    fontSize: '44px',
                                    marginRight: '45%',
                                    lineHeight: '1.1em'
                                }}>
                        使用 Blender 和 动画制作技巧完善艺术品。
                    </Typography>
                </Grid>
                <Grid item xs={2}/>
                <Grid item xs={8}>
                    <Divider variant="middle"/>

                    {getPopularTags()}
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
                        {
                            items.map((item, index) => {
                                return (
                                    <Grid item xs={4}>
                                        <CategoryCard width={290} key={index} {...item}/>
                                    </Grid>
                                )
                            })
                        }
                </Grid>
            </Box>

        </React.Fragment>
    );
}

export default Category;