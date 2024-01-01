import React from 'react';
import logo from "../../../../assets/logo/logo.png";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

function Logo(props) {
    const {title, color} = props
    return (
       <React.Fragment>
           <img className="logo" src={logo} style={{width: '60px', height: '55px'}} alt={"logo"}/>
            <Typography
                variant="h4"
                sx={{
                    marginLeft: '15px',
                    display: {xs: 'none', sm: 'block'},
                    color:`${color}`,
                    fontFamily: 'fantasy'
                }}
            >
                {title}

            </Typography>
       </React.Fragment>
    );
}

export default Logo;