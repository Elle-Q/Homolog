import React from 'react';
import logo from "../../../../../assets/logo/logo.png";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

function Logo(props) {
    const {title, color} = props
    const navigate = useNavigate();

    return (
       <div style={{width: '20%', display: "flex", cursor: 'pointer'}} onClick={() => navigate("/")}>
           <img className="logo" src={logo} style={{width: '50px', height: '45px'}} alt={"logo"}/>
            <h1
                style={{
                    marginLeft: '15px',
                    display: {xs: 'none', sm: 'block'},
                    color:`${color}`,
                    fontFamily: 'fantasy'
                }}
            >
                {title}
            </h1>
       </div>
    );
}

export default Logo;