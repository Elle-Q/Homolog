import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import ChapterCard from "./chapterCard";
import Typography from "@mui/material/Typography";
import {selectItemModal} from "../item-slice";
import {useSelector} from "react-redux";

function List(props) {

    const {item} = useSelector(selectItemModal);

    return (
        <Stack direction={"column"} sx={{marginBottom: '80px'}}>
            <Typography variant={'h4'}
                        sx={{color: '#00a896', fontFamily: 'cursive', padding: '10px'}}>章节目录</Typography>
            {
                item.Chapters && item.Chapters.map((chapter, index) => {
                    return <ChapterCard chapter={chapter} index={index}/>
                })
            }
        </Stack>
    )
}

export default List;