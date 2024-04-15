import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import IssueCard from "./issue/issue-card";
import Sider from "./sider/sider";
import IssueService from "../../../api/issue.service";
import './community.scss'
import Office from "../../../assets/icons/office.png"
import {FlexCenter} from "../../../components/center/center";

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
            <FlexCenter>
                <div className="community__header-box">
                    <div className="community__header-heading-box--left">
                        <img src={Office}/>
                        <h1>我有工具<br/>你有创意</h1>
                    </div>
                    <div className="community__header-heading-box--right">
                        <h2 className="community__header-heading-h2">视频教程翻译</h2>
                        <p>leetroll字幕组人工精翻 涵盖blender maya brush hudini UE 3dMax等主流3d软件</p>
                    </div>
                    <div className="community__header-heading-box--right">
                        <h2 className="community__header-heading-h2">3D资源下载</h2>
                        <p>本站提供丰富的3d资源下载<br/> 模型 4k贴图 hdri 合集</p>
                    </div>
                </div>
            </FlexCenter>
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