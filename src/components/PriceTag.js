import React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


function PriceTag(props) {
    const {height, price} = props;
    let borderColor = price===0?'#00a896':'#fdce71'
    return (
        <Box style={{
            display:"flex",
            backgroundColor:"transparent",
            alignItems:"center",
            justifyContent:"center",
            borderTopLeftRadius:3,
            borderBottomLeftRadius:3,
            height: `${height}px`,
            fontWeight:700,
            border: `${height/2}px solid ${borderColor}`,
            borderRight: '18px solid transparent',
        }}>
            <span style={{color:"black",fontSize:18, marginRight:'10px'}} >{price === 0 ? 'free': `￥${price}`}</span>
        </Box>
    );
}

export default PriceTag;