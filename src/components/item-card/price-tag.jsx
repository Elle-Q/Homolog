import React from 'react';


function PriceTag(props) {
    const {price} = props;
    let borderColor = price === 0 ? '#00a896' : '#595DFD'
    return (
        <div style={{
            display: "flex",
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            height: '2.4rem',
            borderWidth: '1.2rem',
            borderStyle: 'solid',
            borderColor: `${borderColor} transparent ${borderColor} ${borderColor}`
        }}>
            <span style={{
                color: "#fcfbfb",
                fontSize: 14,
                marginRight: '1rem'
            }}>{price === 0 ? 'free' : `￥${price}`}</span>
        </div>
    );
}

export default PriceTag;