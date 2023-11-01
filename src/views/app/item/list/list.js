import React from 'react';
import Stack from "@mui/material/Stack";
import ChapterCard from "./chapterCard";
import Typography from "@mui/material/Typography";

function List(props) {

    const {chapters} = props

    return (

        <Stack direction={"column"} >
            <Typography variant={'h4'} sx={{color: '#00a896', fontFamily: 'cursive', padding: '10px'}}>章节目录</Typography>
            {
                chapters && chapters.map(chapter => {
                    return <ChapterCard chapter={chapter}/>
                })
            }
        </Stack>
    )
}

export default List;