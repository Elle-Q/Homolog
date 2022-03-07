import React from 'react';
import {Input, TextField} from "@mui/material";

function InputLabel(props) {
    const {name, value} = props;
    return (
        <div style={{marginBottom: '14px', marginTop: '14px', marginLeft: '10px'}}>
            <em style={{color: "#EB5E28", marginRight: '15px'}}>{name}:</em>
            <Input placeholder="名称必填哦*" value={value}   />
        </div>
    );
}

export default InputLabel;