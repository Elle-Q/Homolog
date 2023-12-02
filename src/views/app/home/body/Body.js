import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Subject from "./subject/Subject";
import Box from "@mui/material/Box";
import {ListCatsWithItems} from "../../../../api/cat.service";
import {Footer} from "../footer/Footer";
import Header from "../header/Header";

function Body(props) {

    const [subjects, setSubjects] = React.useState([]);

    //查询所有subject todo: 这里需要瀑布流 2022-3-6
    useEffect(() => {
        const fetchData = async () => {
            await ListCatsWithItems().then(data => {
                setSubjects(data)
            })
        }
        fetchData().catch()
    }, [])

    return (
        <Box sx={{
            width: '80%',
            ml: '10%',
            mr: '10%',
            mt: '20px',
            overflow: "hidden",
        }}>
            <Grid container
                  spacing={5}
                  direction="column"
                  alignItems="center"
            >
                <Grid item xs={12} justifyItems={"center"} justifyContent={"center"}>
                    <Header/>
                </Grid>
                {
                    subjects && subjects.map((subject, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                                <Subject subject={subject}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    );
}

export default Body;