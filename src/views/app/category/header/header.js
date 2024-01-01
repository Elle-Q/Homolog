import React from 'react';
import Grid from "@mui/material/Grid";
import img from "../../../../assets/cat_animate3-2.gif";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {getPopularTags} from "../../../../utils/ToolUtil";
import tags from "../../../../json/popTags.json";

function Header(props) {
    const {category} = props

    return (
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
    );
}

export default Header;