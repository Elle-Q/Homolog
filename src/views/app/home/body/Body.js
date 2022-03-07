import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Carousell from "./carousel/Carousell";
import Categories from "../../../../json/category.json";
import Subject from "./subject/Subject";
import Box from "@mui/material/Box";
import PageTipFloatingBar from "../../../../components/PageTipFloatingBar";
import {ListCatsWithItems} from "../../../../api/cat.service";

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
    },[])

    return (
        <Box sx={{
            width: '80%',
            ml: '10%',
            mr: '10%',
            mt:'20px',
            overflow: "hidden",
        }}>
            <Grid container
                  spacing={5}
                  direction="column"
                  alignItems="center"
                  justify="center"
            >
                <Grid item xs={12}>
                    <Carousell />
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

            <PageTipFloatingBar />
        </Box>
    );
}

export default Body;