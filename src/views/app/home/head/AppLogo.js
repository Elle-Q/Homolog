import React from 'react';
import IconButton from "@mui/material/IconButton";
import logo from "../../../../assets/cat.svg";
import Typography from "@mui/material/Typography";

function AppLogo(props) {
    const {title, color} = props
    return (
       <React.Fragment>
            <IconButton>
                <img className="logo" src={logo} style={{width: '50px', height: '50px'}} alt={"logo"}/>
            </IconButton>

            <Typography
                variant="h6"
                sx={{
                    display: {xs: 'none', sm: 'block', fontFamily: '-apple-system'},
                    color:`${color}`
                }}
            >
                {title}

            </Typography>
       </React.Fragment>
    );
}

export default AppLogo;