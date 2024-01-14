import React from 'react';
import logo from "../../../../assets/logo/logo.png";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function Logo(props) {
    const {title, color} = props
    return (
       <div style={{width: '20%', display: "flex"}}>
           <img className="logo" src={logo} style={{width: '40px', height: '35px'}} alt={"logo"}/>
            <Typography
                variant="h6"
                sx={{
                    marginLeft: '15px',
                    display: {xs: 'none', sm: 'block'},
                    color:`${color}`,
                    fontFamily: 'fantasy'
                }}
            >
                {title}

            </Typography>
       </div>
    );
}

export default Logo;