import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function PriceTag(props) {
    const {height} = props;
    return (
        <Box style={{
            display:"flex",
            backgroundColor:"transparent",
            alignItems:"center",
            justifyContent:"center",
            width:130,
            borderTopLeftRadius:3,
            borderBottomLeftRadius:3,
            height: `${height}px`,
            margin: 10,
            fontWeight:700,
            border: `${height/2}px solid #fdce71`,
            borderRight: '18px solid transparent',
        }}>
            <span style={{color:"black",fontSize:18,marginLeft:1}} >$ 188.99</span>
        </Box>
    );
}

export default PriceTag;