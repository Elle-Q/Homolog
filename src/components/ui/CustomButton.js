import {alpha} from "@mui/material/styles";
import Button from "@mui/material/Button";
import React from "react";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import {Link} from "react-router-dom";
import AirplayIcon from "@mui/icons-material/Airplay";

const StyledDiv = styled.div`
        width: 100%;
        min-height: 50px;
        background-color: rgba(19,47,76,0.2);
        border-radius: 10px;
        margin-top:20px;
        text-align: center;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#e9c46a;
`

export const OKButton = (props) => {
    const {handleClick} = props;

    return (
        <Button sx={{
            borderColor:'#252422',
            backgroundColor:"transparent",
            fontSize:'12px',
            color:'secondary.light',
            width:'80px',
            height:'50px',
            '&:hover': {
                backgroundColor:alpha('#0aa858', 0.3),
                borderColor:'#252422',
                fontSize:'14px',
            }
        }} autoFocus onClick={handleClick}>
            保存
        </Button>
    )
}

export const CancelButton = (props) => {
    const {handleClick} = props;

    return (
        <Button sx={{
            borderColor:'#252422',
            backgroundColor:"transparent",
            fontSize:'12px',
            color:'text.secondary',
            width:'80px',
            height:'50px',
            '&:hover': {
                backgroundColor:alpha('#403D39', 0.3),
                borderColor:'#252422',
                fontSize:'14px',
            }
        }} autoFocus onClick={handleClick}>
            取消
        </Button>
    )
}

export const CartButton = (props) => {
    const {icon} = props
    return (
        <Typography variant="h5"
                    component="button"
                    color="white"
                    sx={{
                        width: '100%',
                        height: '50px',
                        backgroundColor: "red",
                        border: '1px solid red',
                        borderRadius: '10px',
                        boxShadow: '0 0 5px #EB5E28',
                        '&:hover': {
                            backgroundColor: alpha('#132f4c', 0.2),
                            boxShadow: '0 0 5px #001E3C',
                            fontSize: '30px',
                            border: "none",
                            cursor: "pointer",
                            color: "red",
                            '& *': {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.4s ease-in-out',
                            }
                        }
                    }}>
            {icon}
        </Typography>
    )
}

export const BigLinkButton = (props) => {
    const {icon, linkTo} = props
    return (
        <StyledDiv>
            <Link to={linkTo} style={{ color: '#EB5E28'}}>
                {icon}
            </Link>
        </StyledDiv>
    )
}