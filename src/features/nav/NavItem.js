import React from 'react';
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";

function NavItem(props) {
    const {to, icon, text, showText, handleClick, type} = props;

    const size = type === 'first' ? '25px' : '22px';
    const fontSize = type === 'first' ? '16px' : '13px';
    return (

        <Link
            to={`${to}`}
            style={{
                textDecoration: 'none',
                marginRight: '8px',
                display: "flex",
                border: "none",
                minWidth:'20px',
            }}
            onClick={(e) => {
                if (to === undefined) {
                    e.preventDefault()
                    handleClick()
                }
            }}
        >
            <IconButton>
                <img alt="icon" className="logo" src={icon} style={{width: size, height: size}}/>
            </IconButton>
            {
                showText ? <span style={{color: '#999', fontSize: fontSize}}> {text}</span> : <></>
            }
        </Link>
    );
}

export default NavItem;