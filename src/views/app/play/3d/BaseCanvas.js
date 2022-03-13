import React from 'react';


const style = {
    outline: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    mixBlendMode: 'exclusion',
    // border:'1px solid #3399ff',
    boxShadow: "0 0 2px #3399ff",
    borderRadius: '15px',
    marginBottom: '50px',
}

function BaseCanvas(props) {
    const {size} = props;

    return (
        <canvas style={style} width={size && size.width} height={size && size.height} id="3d-canvas"/>
    );
}

export default BaseCanvas;