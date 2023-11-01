import React, {useEffect, useState} from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useSelector} from "react-redux";
import {selectUploadItemResc} from "../uploadSlice";
import styled, {keyframes} from "styled-components";
import ChapterArea from "./ChapterArea";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinAddCircleIcon = styled(AddCircleIcon)`
  box-shadow: 0 0 5px white;
  border-radius: 50%;
  animation: ${spin} 5s linear infinite, ${spin} 5s ease-in-out infinite;
`

function Chapter(props) {
    const {item} = useSelector(selectUploadItemResc);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        setChapters(item && item.Chapters)
    }, [item])

    function handleAddChapter() {
        let newChapter = {
            ID: -1,
            Main: [],
            Episodes: []
        }
        setChapters([...chapters, newChapter])
    }

    return (
        <React.Fragment>

            <div style={{display: 'flex', alignItems: 'center'}}>
                <SpinAddCircleIcon fontSize='large' onClick={handleAddChapter}/>
                <span style={{marginLeft: '5px',}}>新增章节</span>
            </div>
            {
                chapters.map((chapter, index) => <ChapterArea chapter={chapter} key={index}/>)
            }
        </React.Fragment>
    );
}

export default Chapter;