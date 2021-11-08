import React from 'react';
import Grid from "@mui/material/Grid";
import Carousell from "../../../features/carousel/Carousell";
import carouselJson from "../../../json/carousel.json";
import Categories from "../../../json/category.json";
import Category from "../../../features/category/Category";
import Box from "@mui/material/Box";

function Body(props) {
    return (
        <Box sx={{
            width: '80%',
            ml: '10%',
            mr: '10%',
            overflow: "hidden",
        }}>
            <Grid container
                  spacing={5}
                  direction="column"
                  alignItems="center"
                  justify="center"
            >
                <Grid item xs={12}>
                    <Carousell items={carouselJson}/>
                </Grid>
                {
                    Categories.map((category, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                                <Category category={category}/>
                            </Grid>
                        )
                    })
                }
            </Grid>

        </Box>
    );
}

export default Body;