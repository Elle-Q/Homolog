import React, {useState} from 'react';
import NavItem from "../../../../features/nav/NavItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {Collapse} from "@mui/material";
import List from "@mui/material/List";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItemButton from "@mui/material/ListItemButton";

import userIcon from '../../../../assets/admin/user.svg'
import orderIcon from '../../../../assets/admin/order.svg'
import analysisIcon from '../../../../assets/admin/sys.svg'
import watchIcon from '../../../../assets/admin/watch.svg'
import timeIcon from '../../../../assets/admin/time.svg'
import apiIcon from '../../../../assets/admin/api.svg'
import fixIcon from '../../../../assets/admin/fix.svg'
import contentIcon from '../../../../assets/admin/content.svg'
import rescIcon from '../../../../assets/admin/resc.svg'
import uploadIcon from '../../../../assets/admin/upload.svg'
import catIcon from '../../../../assets/admin/cat.svg'
import accountIcon from '../../../../assets/admin/account.svg'
import configIcon from '../../../../assets/admin/config_s.svg'

function SideBar(props) {

    const [showText, setShowText] = useState(true);
    const [openSys, setOpenSys] = useState(false);
    const [openContent, setOpenContent] = useState(false);

    return (
        <Box sx={{
            display: 'flex',
            pl: '20px',
            pr: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 3px #0a0908',
            minHeight: '800px',
        }}>
            <Stack spacing={2}>
                {
                    showText ?
                        <ArrowBackIosNewIcon fontSize="small"
                                             sx={{
                                                 '&:hover': {
                                                     color: 'text.secondary'
                                                 }
                                             }}
                                             onClick={() => setShowText(!showText)}/>
                        :
                        <ArrowForwardIosIcon fontSize="small" onClick={() => setShowText(!showText)}/>
                }

                <NavItem to = '/admin/user' icon={userIcon} text="用户管理" showText={showText} type='first' />
                <NavItem to = '/admin/order' icon={orderIcon} text="订单管理" showText={showText} type='first' />
                <NavItem icon={contentIcon} text="内容管理" showText={showText} type='first' handleClick={() =>setOpenContent(!openContent)}/>
                <Collapse in={openContent} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 4}}>
                            <NavItem to = '/admin/content/cat' icon={catIcon} text="分类" showText={showText} type='sub' />
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}}>
                            <NavItem to = '/admin/content/item' icon={rescIcon} text="资源" showText={showText} type='sub' />
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}}>
                            <NavItem to = '/admin/content/upload' icon={uploadIcon} text="上传" showText={showText} type='sub' />
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}}>
                            <NavItem to = '/admin/content/config' icon={configIcon} text="配置" showText={showText} type='sub' />
                        </ListItemButton>
                    </List>
                </Collapse>
                <NavItem  icon={analysisIcon} text="系统管理" showText={showText} type='first' handleClick={()=>setOpenSys(!openSys)}/>
                <Collapse in={openSys} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{pl: 4}}>
                            <NavItem to = '/service' icon={watchIcon} text="服务监控" showText={showText} type='sub'/>
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}}>
                            <NavItem to = '/api' icon={apiIcon} text="接口管理" showText={showText} type='sub'/>
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}}>
                            <NavItem to = '/time' icon={timeIcon} text="定时任务" showText={showText} type='sub'/>
                        </ListItemButton>
                    </List>
                </Collapse>
                <NavItem name = 'fix' icon={fixIcon} text="工单管理" showText={showText} type='first'/>
                <NavItem name = 'fix' icon={accountIcon} text="资金管理" showText={showText} type='first'/>

            </Stack>
        </Box>
    );
}

export default SideBar;