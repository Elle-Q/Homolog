import React from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {getPopularTags} from "../../../../utils/ToolUtil";
import tags from "../../../../json/popTags.json";
import {styled} from "@mui/material/styles";
import SearchImg from '../../../../assets/svg/search_2.png'

const SearchInput = styled('input')(({theme}) => ({
    position: 'absolute',
    left: '25%',
    top: '30%',
    zIndex: -1,
    backgroundColor: '#907ad6',
    width: '50%',
    height: '50px',
    borderColor: 'none',
    borderRadius: '50px',
    textAlign: 'center',
    boxShadow: '0 0 5px #6c70e5',
    letterSpacing: '0.094em',
    outline: 'none',
    fontFamily: 'cursive',
    fontSize: '18px',
    border: 0,
    '&::active' : {
        border: 0,
    },
    '&:hover' : {
        backgroundColor: '#907ad6',
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
            <Grid item xs={8} style={{position:"relative", zIndex: 0, marginBottom: '20px'}}>
                    <img src={SearchImg} style={{width: '80px', zIndex: 0, marginLeft: '20%'}}/>
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