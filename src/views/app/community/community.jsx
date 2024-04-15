import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import IssueCard from "./issue/issue-card";
import Sider from "./sider/sider";
import IssueService from "../../../api/issue.service";
import './community.scss'
import {FlexCenter} from "../../../components/center/center";
import Agenda from "../../../components/agenda/agenda";

function Community(props) {

    const [issues, setIssues] = useState([])

    useEffect(() => {
        IssueService.list('official').then(resp => {
            setIssues(resp)
        })
    }, [])


    return (
        <div className="community">
            <FlexCenter> <Agenda/> </FlexCenter>
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