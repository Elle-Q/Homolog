import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import IssueCard from "./issue/issue-card";
import Sider from "./sider/sider";
import IssueService from "../../../api/issue.service";
import './community.scss'

function Community(props) {

    const [selected, setSelected] = useState("issue");
    const [issues, setIssues] = useState([])

    useEffect(() => {
        IssueService.list('official').then(resp => {
            setIssues(resp)
        })
    }, [])

    const handleTabClick = (e) => {
        setSelected(e.target.id)
    }

    return (
        <div className="community">
            <div className="community__heading-box">
                <p className="community__heading">
                    leetroll专注于视频教程翻译和3D资源下载 提供优质的视频教程翻译和丰富的3D资源
                    促进知识分享和创意实践 <br></br>
                    <span>视频教程翻译</span> &nbsp; <span>3D资源下载</span>
                </p>
            </div>
            <Box sx={{
                width: '100%',
                borderRadius: '10px',
                backgroundColor: "transparent",
                display: "flex",
            }}>
                <Grid container
                      direction="row"
                      justifyContent="flex-start"
                      sx={{
                          flexWrap: "wrap"
                      }}
                >
                    <Grid item xs={2}>
                        <Sider/>
                    </Grid>

                    <Grid item xs={9} sx={{mb: '80px', display: "flex"}}>
                        <Stack sx={{width: "100%"}} spacing={2} direction='column'>
                            {issues.map((issue, index) => (
                                <IssueCard key={issue.id} issue={issue}/>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Community;