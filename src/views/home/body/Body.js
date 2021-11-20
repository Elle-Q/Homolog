import React from 'react';
import Grid from "@mui/material/Grid";
import Carousell from "../../../features/carousel/Carousell";
import carouselJson from "../../../json/carousel.json";
import Categories from "../../../json/category.json";
import Subject from "../../../features/subject/Subject";
import Box from "@mui/material/Box";
import PageTipFloatingBar from "../../../common/PageTipFloatingBar";

function Body(props) {
    return (
        <Box sx={{
            width: '80%',
            ml: '10%',
            mr: '10%',
            mt:'20px',
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
                                <Subject category={category}/>
                            </Grid>
                        )
                    })
                }
            </Grid>

            <PageTipFloatingBar />
        </Box>
    );
}

export default Body;