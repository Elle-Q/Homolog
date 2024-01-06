import React from 'react';
import Box from "@mui/material/Box";
import Sort from "./Sort";
import Divider from "@mui/material/Divider";
import PriceFilter from "./PriceFilter";
import {alpha} from "@mui/system";
import FileFormatFilter from "./FileFormatFilter";


function SideBar(props) {
    return (
        <Box sx={{
            backgroundColor: alpha('#0a0908',0.7),
            height: '60vh',
            width: '300px',
            borderRadius: '10px',
            boxShadow: '0 0 5px #0a0908',
            padding:'10px'
        }}>
            <table >
                <tr>
                    <td><Sort/></td>
                </tr>
                <Divider sx={{mt: '30px',mb: '10px'}}/>
                <tr>
                    <FileFormatFilter/>
                </tr>
            </table>
        </Box>
    );
}

export default SideBar;