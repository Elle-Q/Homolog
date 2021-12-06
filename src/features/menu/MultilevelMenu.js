import React, {useState} from 'react';
import {Link} from "react-router-dom";
import menu from '../../json/menu.json'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {alpha} from "@mui/system";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import AnimationIcon from '@mui/icons-material/Animation';
import more from "../../assets/more.svg";
import Button from "@mui/material/Button";

function MultilevelMenu(props) {
    const {onMouseLeave} = props;

    const MenuItem = (props) => {
        const {item} = props;
        return (
            <Link to={item.url} style={{textDecoration: "none"}} onClick={onMouseLeave}>
                <div
                    style={{
                        width: '180px',
                        padding: '10px',
                        display:'flex',
                        alignItems: 'center',
                    }}>
                    <img style={{width:25, height:25}} alt="menu" title="more" src={item.icon}/>
                    <Typography sx={{ml:'15px',cursor:"pointer"}} variant="body" component="label" color='#EB5E28'>
                        {item.name}
                    </Typography>
                </div>
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