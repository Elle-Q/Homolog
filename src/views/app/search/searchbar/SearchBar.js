import React from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {getPopularTags} from "../../../../utils/ToolUtil";
import tags from "../../../../json/popTags.json";
import {styled} from "@mui/material/styles";
import {alpha} from "@mui/system";
import SearchImg from '../../../../assets/svg/search_1.png'

const SearchInput = styled('input')(({theme}) => ({
    position: 'absolute',
    left: '25%',
    top: '72%',
    zIndex: -1,
    backgroundColor: '#edf2f4',
    width: '50%',
    height: '50px',
    borderColor: 'none',
    borderRadius: '50px',
    textAlign: 'center',
    boxShadow: '10px 10px 14px 1px rgba(00,00,00,0.2)',
    letterSpacing: '0.094em',
    outline: 'none',
    fontFamily: 'cursive',
    fontSize: '18px',
    border: 0,
    '&::active' : {
        border: 0,
    },
}));

function SearchBar(props) {
    return (
        <Grid container
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              columnSpacing={{xs: 1, sm: 2, md: 3}}
        >
            <Grid item xs={2}/>
            <Grid item xs={8} style={{textAlign: "center",  position:"relative", zIndex: 0, marginBottom: '20px'}}>
                    <img src={SearchImg} style={{width: '250px', zIndex: 0}}/>
                    <SearchInput></SearchInput>
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