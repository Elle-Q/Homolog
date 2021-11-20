import React, {useState} from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import {alpha} from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import { Link } from "react-router-dom";
import {styled} from '@mui/system';

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

function ImageCard(props) {
    const theme = useTheme();
    const {imgSrc, name, subTitle, width} = props;
    const subject = 'animation';
    return (
        <Card
            raised={true}
            sx={{
                backgroundColor: "transparent",
                boxShadow: "none",
                ml: '20px',
                mr: '20px',
                minWidth: '258px',
                minHeight: '170px',
                transform: `translateX(${width}px)`,
                transition: 'transform 1s ease-in-out',
                '&:hover' : {
                    '.MuiCardHeader-root': {
                        height: '2px',
                    }
                }
            }} >
            <CardHeader sx={{backgroundColor: alpha(theme.palette.secondary.light, 0.8), height: '5px', padding: 0}}
            />
            <StyledLink to={`/category/${subject}`} key={name}  >
                <CardMedia
                    raised="true"
                    component="img"
                    image={imgSrc}
                    alt={name}
                    sx={{
                        width: '258px',
                        height: '150px',
                        boxShadow: 5,
                        borderRadius: 1,
                    }}
                />
                <Typography variant="h6" component="div" color={theme.palette.secondary.light} sx={{mt: '5px'}}>
                    {name}
                </Typography>
                <Typography color={alpha(theme.palette.primary.contrastText, 0.75)}>
                    {subTitle}

                </Typography>
            </StyledLink>
        </Card>
    );
}

export default ImageCard;