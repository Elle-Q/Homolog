import React, {useState} from 'react';
import NavItem from "../../../features/nav/NavItem";
import userIcon from '../../../assets/admin/user.svg'
import orderIcon from '../../../assets/admin/order.svg'
import analysisIcon from '../../../assets/admin/analysis.svg'
import fixIcon from '../../../assets/admin/fix.svg'
import contentIcon from '../../../assets/admin/content.svg'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SideBar(props) {

    const [showText, setShowText] = useState(true);

    return (
        <Box sx={{
            display:'flex',
            padding:'20px',
            borderRadius: '10px',
            boxShadow: '0 0 5px #403D39',
            backgroundColor:'secondary.main',
            minHeight:'800px'
        }}>
            <Stack spacing={2} >
                {
                    showText ?
                        <ArrowBackIosNewIcon fontSize="small" onClick={() => setShowText(!showText)}/>
                        :
                        <ArrowForwardIosIcon fontSize="small" onClick={() => setShowText(!showText)}/>
                }

                <NavItem icon={userIcon} text="用户管理" showText={showText}/>
                <NavItem icon={orderIcon} text="订单管理" showText={showText}/>
                <NavItem icon={contentIcon} text="内容管理" showText={showText}/>
                <NavItem icon={analysisIcon} text="系统管理" showText={showText}/>
                <NavItem icon={fixIcon} text="工单管理" showText={showText}/>
            </Stack>
        </Box>
    );
}

export default SideBar;