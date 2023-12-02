import React, {useState} from 'react';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import {alpha} from "@mui/system";
import {StyledLink} from "../../../../../components/styled/StyledComponent";

function ImageCard(props) {
    const theme = useTheme();
    const {item, width} = props;
    return (
        <Card
            raised={true}
            sx={{
                backgroundImage: 'linear-gradient( 135deg, #97ABFF 10%, #123597 100%)',
                boxShadow: "none",
                ml: '20px',
                mr: '20px',
                minWidth: '254px',
                minHeight: '170px',
                borderRadius: 5,
                transform: `translateX(${width}px)`,
                transition: 'transform 1.5s ease-in-out',
                filter: 'grayscale(100%)',
                '&:hover' : {
                    filter: 'grayscale(0%)',
                }
            }}>
            {/*<CardHeader sx={{backgroundColor: alpha(theme.palette.secondary.light, 0.8), height: '5px', padding: 0}}*/}
            {/*/>*/}
            <StyledLink to={`/app/category/${item.ID}`} key={item.Title}  >
                <CardMedia
                    raised="true"
                    component="img"
                    image={item.Preview}
                    alt={item.Title}
                    sx={{
                        width: '258px',
                        height: '150px',
                        boxShadow: 5,
                        borderRadius: 5,
                        '&:hover' : {
                            transform: `scale(1.02)`,
                        }
                    }}
                />
                <Typography variant="h6" component="div" color='white' sx={{mt: '5px', fontWeight:"bold"}}>
                    {item.Title}
                </Typography>
                <Typography color={alpha(theme.palette.primary.contrastText, 0.75)} sx={{fontSize:'12px'}}>
                    {item.SubTitle}

                </Typography>
            </StyledLink>
        </Card>
    );
}

export default ImageCard;