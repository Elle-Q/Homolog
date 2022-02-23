import React, {useState} from 'react';
import {Link} from "react-router-dom";
import menu from '../json/menu.json'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {alpha} from "@mui/system";
import List from "@mui/material/List";

function MultilevelMenu(props) {
    const {onMouseLeave} = props;

    const MenuItem = (props) => {
        const {item} = props;
        return (
            <Link to={item.url}
                  style={{
                      textDecoration: "none",
                  }}
                  onClick={onMouseLeave}>
                <Box
                    sx={{
                        width: '180px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: alpha('#fff', 0.1),
                            borderRadius:'8px'
                        }
                    }}>
                    <img style={{width: 25, height: 25}} alt="menu" title="more" src={item.icon}/>
                    <Typography sx={{ml: '15px', cursor: "pointer"}} variant="body" component="label" color='#EB5E28'>
                        {item.name}
                    </Typography>
                </Box>
            </Link>
        )
    };

    return (
        <Box
            onMouseLeave={onMouseLeave}
            sx={{
                position: 'absolute',
                left: -50,
                top: 25,
                zIndex: 111,
                borderRadius: '10px',
                backgroundColor: alpha('#0a0908', 0.9),
            }}>
            <List component="div" disablePadding>
                {menu.map((item, key) => (
                    <MenuItem key={key} item={item}/>
                ))}
            </List>

        </Box>

    );
}

export default MultilevelMenu;