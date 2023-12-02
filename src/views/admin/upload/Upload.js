import React, {createRef, useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setItem} from "./uploadSlice";
import {GetItemFiles} from "../../../api/item.service";
import {SimpleInput} from "../../../components/ui/SimpleInput";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import Chapter from "./chapter/Chapter";
import Regular from "./regular/Regular";
import {setItemID} from "../../admin/upload/uploadSlice";
import GradientButton from "../../../components/ui/GradientButton";

const StyledIconButton = styled(IconButton)`
  margin-left: 8px;
  background-color: rgba(10, 168, 88, 0.5);
  box-shadow: 0 0 3px #0aa858;

  &:hover {
    box-shadow: 0 0 3px #403D39;
    background-color: rgba(10, 168, 88, 1);
  }
`

function Upload(props) {
    const {itemID, refresh} = useSelector(selectUploadItemResc);
    const dispatch = useDispatch();
    const itemIDRef = createRef();
    const [tab, setTab] = useState('regular');

    useEffect(() => {
        GetItemFiles(itemID)
            .then(item => {
                dispatch(setItem(item))
            })
    }, [itemID])


    useEffect(() => {
        handleSearch()
    }, [refresh])


    //根据item_id搜索
    const handleSearch = () => {
        GetItemFiles(itemIDRef.current.value)
            .then(item => {
                dispatch(setItem(item))
                dispatch(setItemID(item.ID))
            })
    }

    const handleTabClick = () => {
        setTab(tab === '测评' ? "review" : "list");
    }
    return (
        <Stack style={{padding: '0px 60px'}} spacing={5}>
            <div style={{display: "flex", justifyContent: "start", marginTop: '50px'}}>
                {/*搜索组件*/}
                <SimpleInput ref={itemIDRef} name="item_id" placeholder="输入item_id" value={itemID}/>
                <StyledIconButton onClick={handleSearch}>
                    <SearchIcon/>
                </StyledIconButton>
            </div>

            <Stack direction={'row'} style={{justifyContent: 'center', borderBottom: '1px solid grey'}}>
                <GradientButton name="基础资源" onClick={() => setTab("regular")}/>
                <GradientButton name="章节资源" onClick={() => setTab("chapter")}/>
            </Stack>

            {
                tab === 'regular' ? <Regular/> : <Chapter />
            }


        </Stack>
    );
}

export default Upload;