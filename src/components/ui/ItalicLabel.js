import React from 'react';
import Typography from "@mui/material/Typography";

function ItalicLabel(props) {
    const {name, value} = props;
    return (
        <div style={{marginBottom: '14px', marginTop: '14px', marginLeft: '10px'}}>
            <em style={{color: "#999", marginRight: '15px'}}>{name}:</em>
            <Typography variant="body" color='white'> {value} </Typography>
        </div>
    );
}

export default ItalicLabel;