import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Divider, Stack} from "@mui/material";
import IssueCard from "./issue/IssueCard";
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {alpha} from "@mui/system";
import styled from "styled-components";
import PostCard from "./post/PostCard";
import UserInfoSide from "./user/UserInfoSide";

const StyledA = styled.a`
  line-height: 25px;
  display: flex;
  padding: 8px 36px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover, &:focus {
    border-bottom: 2px solid grey;
  }
`

const ATab = ({icon, name, id, selected, handleClick}) => {
    return (
        <StyledA id={id}
                 onClick={handleClick}
                 style={{
                     borderBottom: selected && '2px solid #3399ff',
                     color: selected ? 'white' : alpha('#fff', 0.5),
                 }}
        >{icon}{name}</StyledA>
    )
}

const items = [
    {
        ID:652,
        Title:"猴子的屁股为什么红?",
        Content: "lol",
        UserName: "QU YONGJIE",
        UserAvatar: "/avatar/avatar4.jpg",
        Collects: 21,
        Likes: 21,
        Hates: 21,
        Comments: 21,
        Status:'已打开',
        Color:'#EE80B5'
    },
    {
        ID:103,
        Title:"今天为什么不开心?",
        Content: "well...\n" +
            "                                im sitting in front of my pc for the fucking whole day. The volunteer\n" +
            "                                stab my nose bleeding. we bought a pile of vegetables and 60 eggs.\n" +
            "                                NO MEAT genius",
        UserName: "QU Xiaoyu",
        UserAvatar: "/avatar/avatar10.jpg",
        Collects: 21,
        Likes: 51,
        Hates: 121,
        Comments: 201,
        Status:'已关闭',
        Color:'#16db65'
    },
    {
        ID:8552,
        Title:"WHY AM I FUCKING SO SMART?",
        Content: "后i啊合法江苏梦兰思念的角度来讲埃里克森狄加拉斯买了你的",
        UserName: "Taylor Wandar",
        UserAvatar: "/avatar/avatar7.jpg",
        Collects: 1221,
        Likes: 21000,
        Hates: 210,
        Comments: 21,
        Status:'挂起中',
        Color:'#0496ff'
    }
]
function Community(props) {

    const [selected, setSelected] = useState("issue");

    useEffect(() => {

    })

    const handleTabClick = (e) => {
        setSelected(e.target.id)
    }

    return (
        <div style={{height: '100vh'}}>
            <Box sx={{display: "flex", justifyContent: "center", mt: '20px'}}>
                <ATab name="问题" id='issue'
                      handleClick={handleTabClick}
                      icon={<BugReportRoundedIcon onClick={(e) => e.stopPropagation()}/>}
                      selected={selected === 'issue'}/>
                <ATab name="博客" id='post'
                      handleClick={handleTabClick}
                      icon={<PsychologyIcon onClick={(e) => e.stopPropagation()}/>} selected={selected === 'post'}/>
            </Box>
            <Divider sx={{mt: '0px', mb: '10px'}}/>
            <Box sx={{
                width: '80%',
                ml: '10%',
                mr: '10%',
                borderRadius: '10px',
                backgroundColor: "transparent",
                display: "flex",
                mt: '40px',
            }}>
                <Grid container
                      direction="row"
                      justifyContent="flex-start"
                      sx={{
                          flexWrap: "wrap"
                      }}
                >
                    <Grid item xs={3} sx={{ pl:'60px' }}>
                        <UserInfoSide />
                    </Grid>

                    <Grid item xs={9} sx={{mb: '80px', display: "flex"}}>
                        {selected === 'issue' ?
                            <Stack sx={{width: "100%"}} spacing={2} direction='column'>
                                {items.map((item, index) => (
                                    <IssueCard key={index} item={item}/>
                                ))}
                            </Stack>
                            :
                            <Stack sx={{width: "100%"}} spacing={2} direction='column'>
                                {items.map((item, index) => (
                                    <PostCard key={index} item={item}/>
                                ))}
                            </Stack>
                        }

                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Community;