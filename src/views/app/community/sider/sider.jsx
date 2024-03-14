import React from 'react';
import './sider.scss'
import Typography from "@mui/material/Typography";

function Sider(props) {

    return (
        <div className="box-container">
            <Typography className="box ten" >
                <span>官方答疑</span>
                <span className="number-area">5</span>
            </Typography>
            <Typography className="box one" >
                <span>Blender</span>
                <span className="number-area">0</span>
            </Typography>
            <Typography className="box two" >
                <span>Zbrush</span>
                <span className="number-area">0</span>
            </Typography>
            <Typography className="box three" >
                <span>Maya</span>
                <span className="number-area">0</span>
            </Typography>
            <Typography className="box four" >
                <span>UE</span>
                <span className="number-area">0</span>
            </Typography>
            <Typography className="box five" >
                <span>MD</span>
                <span className="number-area">0</span>
            </Typography>
            <Typography className="box six" >
                <span>C4D</span>
                <span className="number-area">0</span>
            </Typography>
            <Typography className="box seven" >
                <span>3dMax</span>
                <span className="number-area">0</span>
            </Typography>
            <Typography className="box eight" >
                <span>Houdini</span>
                <span className="number-area">0</span>
            </Typography>
        </div>
    );
}

export default Sider;