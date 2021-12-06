import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {getStarIcons} from "../../utils/ToolUtil";
import Avatar from '@mui/material/Avatar';
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import more from "../../assets/more.svg";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import {Link} from "react-router-dom";
import ByAuthor from "../../common/ByAuthor";


const Label = props => {
    const {name, value, lables, goCategoryClick} = props;
    return (
        <div style={{marginBottom: '14px', marginTop: '14px', marginLeft: '10px'}}>
            {
                name === 'tags' ?
                    <LoyaltyIcon sx={{color: "icon.first"}}/>
                    :
                    <em style={{color: "#999", marginRight: '15px'}}>{name}:</em>
            }
            <Typography variant="body" color='white'> {value} </Typography>
            {
                lables && lables.map((key, index) => {
                    return <Chip
                        sx={{
                            color: 'secondary.light',
                            m: '2px',
                            boxShadow: '0 0 2px #3399FF',
                            borderColor: 'secondary.light',
                            '& > *:hover': {
                                color: 'secondary.contrastText',
                                // backgroundColor:'red'
                            }
                        }}
                        component="a"
                        href=""
                        color='primary'
                        label={key}
                        key={index}
                        onClick={goCategoryClick}
                    />
                })
            }
        </div>
    )
}

function VideoBriefDesc(props) {
    const {score} = props;
    const lables = ["懒人", "blender", "建模", "路追", "教程"]

    const goCategoryClick = () => {

    }

    return (
        <Box
            sx={{
                // height: '900px',
                width: '100%',
                borderRadius: '10px',
                backgroundColor: 'background.paper',
                boxShadow: '0 0 5px black',
                // border: '1px solid #0a0908',
                padding: '10px',
            }}
        >
            <Typography variant="h6" sx={{mb: '20px'}}>简介 & 相关</Typography>


            <Typography color='#EB5E28 !important' sx={{ml: '20px'}}> {getStarIcons(4.5, '40px', '40px')}(143)</Typography>


            <ByAuthor/>

            <Divider variant="middle"/>

            <Label name='文件格式' value='.blender'/>
            <Label name='下载格式' value='zip'/>
            <Label name='文件大小' value='12M'/>
            <Label name='blender版本推荐' value='2.8+'/>
            <Label name='分类' value='懒人建模大法'/>
            <Label name='tags' lables={lables} goCategoryClick={goCategoryClick}/>

            <Divider variant="middle"/>

            <Paper elevation={1} sx={{width: '100%', height: "auto", mt: '24px'}}>
                <em style={{color: "#173A5E", marginRight: '15px'}}>描述</em>

                <p style={{color: "#173A5E", marginLeft: '24px'}}>
                    An invisible connection system; a mystical portal between Illustrator and After Effects.

                    Transfer shapes as you need them without importing, converting or redrawing. The vector workflow you
                    imagined between apps created by the same company.

                    Work with shapes, not files.
                </p>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button sx={{border: "none", backgroundColor: "transparent"}}
                            component={Link} to={"/category"}>
                        <img style={{width: 20, height: 20}} alt="community" title="more" src={more}/>
                    </Button>
                </div>
            </Paper>
        </Box>
    );
}

export default VideoBriefDesc;