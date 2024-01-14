import React from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {getPopularTags} from "../../../../utils/ToolUtil";
import tags from "../../../../json/popTags.json";
import {styled} from "@mui/material/styles";


function SearchBar(props) {
    return (
        <Grid container
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              columnSpacing={{xs: 1, sm: 2, md: 3}}
        >
            <Grid item xs={2}/>
            <Grid item xs={8} style={{position:"relative", zIndex: 0, marginBottom: '20px'}}>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={2}/>
            <Grid item xs={10}>
                <Divider variant="middle"/>
                {getPopularTags(tags, '热门标签:')}
            </Grid>
        </Grid>
    );
}

export default SearchBar;