import React from 'react';


function PriceTag(props) {
    const {price} = props;
    let borderColor = price===0?'#00a896':'#595DFD'
    return (
        <div style={{
            display:"flex",
            backgroundColor:"transparent",
            alignItems:"center",
            justifyContent:"center",
            borderTopLeftRadius:3,
            borderBottomLeftRadius:3,
            height: '24px',
            borderWidth: '12px',
            borderStyle: 'solid',
            borderColor: `${borderColor} transparent ${borderColor} ${borderColor}`
        }}>
            <span style={{color:"#fcfbfb",fontSize:14, marginRight:'10px'}} >{price === 0 ? 'free': `￥${price}`}</span>
        </div>
    );
}

export default PriceTag;