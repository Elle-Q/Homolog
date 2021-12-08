import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {getStarIcons} from "../../utils/ToolUtil";
import {StyledRatioInput} from "../../common/StyledRatioInput";
import {Link} from "react-router-dom";

function NavItem(props) {
    const {icon, text, showText} = props;

    return (

        <Link to={"/"} style={{
            textDecoration: "none",
            display: "flex",

        }} >
            <IconButton>
                <img alt="icon" className="logo" src={icon} style={{width: '25px', height: '25px'}}/>
            </IconButton>
            {
                showText ? <span style={{color: '#999', fontSize: '18px'}}> {text}</span> : <></>
            }
        </Link>
    );
}

export default NavItem;