import React, {createRef, useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setItem} from "./uploadSlice";
import {GetItemFiles, UploadItemFiles} from "../../../api/item.service";
import {SimpleInput} from "../../../components/ui/SimpleInput";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import UploadArea from "./UploadArea";
import {CancelButton, OKButton} from "../../../components/ui/CustomButton";

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
    const {itemID, item} = useSelector(selectUploadItemResc);
    const dispatch = useDispatch();
    const itemIDRef = createRef();
    const [main, setMain] = React.useState([]);
    const [preview, setPreview] = React.useState([]);
    const [attachment, setAttachment] = React.useState([]);
    const [chapter, setChapter] = React.useState([]);

    useEffect(() => {
        GetItemFiles(itemID)
            .then(item => {
                dispatch(setItem(item))
            })
    }, [itemID])


    // 上传并保存文件
    const handleSave = async () => {
        let param = new FormData();
        for (let x = 0; x < main.length; x++) {
            param.append("Main[]", main[x]);
        }
        for (let x = 0; x < preview.length; x++) {
            param.append("Preview[]", preview[x]);
        }
        for (let x = 0; x < attachment.length; x++) {
            param.append("Attachment[]", attachment[x]);
        }
        param.append("ItemID", itemIDRef.current.value)

        await UploadItemFiles(param)
    }

    //根据item_id搜索
    const handleSearch = () => {
        GetItemFiles(itemIDRef.current.value)
            .then(item => {
                dispatch(setItem(item))
            })
    }

    //取消文件上传
    const handleCancel = () => {
        //将文件置空
        setMain([])
        setPreview([])
        setAttachment([])
    }

    return (
        <Stack style={{padding: '0px 60px'}} spacing={5}>
            <div style={{display: "flex", justifyContent: "start", marginTop: '50px'}}>
                {/*搜索组件*/}
                <SimpleInput ref={itemIDRef} name="item_id" placeholder="输入item_id" value={itemID}/>
                <StyledIconButton onClick={handleSearch}>
                    <SearchIcon/>
                </StyledIconButton>
                <div style={{marginLeft: '200px'}}><OKButton handleClick={handleSave}/> <CancelButton
                    handleClick={handleCancel}/></div>
            </div>
            <UploadArea name='Main' uploadType='single' uploadFiles={main} setUploadFiles={(file) => setMain(file)}/>
            <UploadArea name='Preview' uploadType='multi' uploadFiles={preview}
                        setUploadFiles={(files) => setPreview([...preview, ...files])}/>
            <UploadArea name='Attachment' uploadType='single' uploadFiles={attachment}
                        setUploadFiles={(file) => setAttachment(file)}/>
            {/*<UploadArea name='chapter' resc={chapter} uploadType='single' setResc={(file) => setChapter(file)}/>*/}
        </Stack>
    );
}

export default Upload;