import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import SearchBar from "./searchbar/SearchBar";
import Waterfall from "./waterfall/waterfall";

function Search(props) {

    return (
        <div style={{height: '100vh'}}>
            <SearchBar />
            <Box sx={{
                borderRadius: '10px',
                display:"flex",
                mt:'40px',
            }}>
                <Waterfall></Waterfall>
            </Box>

        </div>
    );
}

export default Search;