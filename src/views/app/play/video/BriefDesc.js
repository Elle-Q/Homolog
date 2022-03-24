import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {getStarIcons} from "../../../../utils/ToolUtil";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import more from "../../../../assets/more.svg";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import {Link} from "react-router-dom";
import ByAuthor from "../../../../components/ByAuthor";
import {alpha} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {selectPlayer} from "../playSlice";
import GradientButton from "../../../../components/ui/GradientButton";
import {ByteToM} from "../../../../utils/MathUtil";


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
                            color: 'text.secondary',
                            m: '4px',
                            boxShadow: '0 0 2px #3399FF',
                            borderColor: 'secondary.light',
                            '& > *:hover': {
                                color: 'secondary.contrastText',
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

function BriefDesc(props) {
    const theme = useTheme();
    const {item} = useSelector(selectPlayer);
    const [ref, setRef] = useState({})

    useEffect(() => {
        if (item.Refs.length < 1) return
        setRef(item.Refs[0])
    }, [item])

    //点击tag, 带tag参数跳转到分类页面 (默认分类)
    const handleTagClick = () => {

    }

    return (
        <Box
            sx={{
                // height: '900px',
                width: '100%',
                borderRadius: '10px',
                backgroundColor: alpha(theme.palette.background.paper, 0.4),
                boxShadow: '0 0 5px black',
                padding: '10px',
            }}
        >
            <Typography variant="h6" sx={{mb: '20px', fontWeight:"bold", color:'white'}}>简介 & 下载</Typography>

            <Typography color='#EB5E28 !important'
                        sx={{ml: '20px'}}>
                {getStarIcons(item.Scores, '40px', '40px')}({item.DownCnt})
            </Typography>

            <ByAuthor author={item.Author}/>

            <Divider variant="middle"/>

            <div style={{textAlign: 'center'}}>
                <GradientButton name='下载'
                                width='180px'
                                fontSize='22px'
                                color='LINEAR-gradient(TO RIGHT, #00d2ff 0%, #3a7bd5  51%, #00d2ff  100%)'/>
            </div>

            <Label name='文件格式' value={ref.Format}/>
            <Label name='下载格式' value={ref.Format}/>
            <Label name='文件大小' value={ByteToM(ref.Size)}/>
            <Label name='blender版本推荐' value={ref.Mark}/>
            <Label name='tags' lables={item.Tags} goCategoryClick={handleTagClick}/>

            <Divider variant="middle"/>

            <Paper elevation={1} sx={{width: '100%', height: "auto", mt: '24px'}}>
                <em style={{color: "#173A5E", marginRight: '15px'}}>描述</em>

                <p style={{color: "#173A5E", marginLeft: '24px', overflow: 'hidden', height: '100px'}}>
                    {item.Desc}
                </p>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button sx={{border: "none", backgroundColor: "transparent"}}
                            component={Link} to={`/app/category/${item.CatID}`}>
                        <img style={{width: 20, height: 20}} alt="community" title="more" src={more}/>
                    </Button>
                </div>
            </Paper>
        </Box>
    );
}

export default BriefDesc;