import React, {createRef, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Uploader from "../../../components/Uploader";
import {FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import previewIcon from '../../../assets/admin/preview.svg';
import mainIcon from '../../../assets/admin/main.svg';
import refIcon from '../../../assets/admin/ref.svg';
import Grid from "@mui/material/Grid";
import DragDrop from "../../../components/DragDrop";
import FileDetail from "./FileDetail";
import SearchIcon from '@mui/icons-material/Search';
import FilesShow from "./FilesShow";
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setItem, setItemID, setNewRescFiles, setRescType} from "./uploadSlice";
import {alpha} from "@mui/system";
import UploadButton from "../../../components/ui/UploadButton";
import {GetItemFiles, GetItemWithFiles, UploadItemFiles} from "../../../api/item.service";
import {SimpleInput} from "../../../components/ui/SimpleInput";

const radioStyle = {
    '& .MuiSvgIcon-root': {
        fontSize: 17,
        color: 'white'
    }
}

const iconStyle = {
    width: "50px",
    height: "50px"
}

function Upload_(props) {
    const {newRescFiles, item, itemID, rescType} = useSelector(selectUploadItemResc);
    const dispatch = useDispatch();
    const itemIDRef = createRef();

    useEffect(() => {
        GetItemFiles(itemID)
            .then(item => {
                dispatch(setItem(item))
            })
    }, [itemID])

    const handleRscTypeChange = e => {
        dispatch(setRescType(e.target.value))
    }

    //多文件上传
    const onFileUpload = (event) => {
        handleMulti(event.target.files);
    };

    const handleMulti = (event) => {
        let files = [];
        for (let i = 0; i < event.length; i++) {
            files.push(event[i])
        }
        //fuck, 怎么没想到
        dispatch(setNewRescFiles([...newRescFiles, ...files]))
    };


    //单选item组件
    const RadioItem = (props) => {
        const {value, title, icon} = props;
        return (
            <FormControlLabel value={value} control={<Radio sx={radioStyle}/>}
                              label={
                                  <Tooltip title={title}>
                                      <IconButton sx={{mr: '60px'}}>
                                          <img alt="icon" className="logo" src={icon}
                                               style={iconStyle}/>
                                      </IconButton>
                                  </Tooltip>
                              }/>
        )
    }

    // 上传文件
    const onUploadClick = async () => {
        if (newRescFiles.length < 1) return
        let param = new FormData();
        for (let x = 0; x < newRescFiles.length; x++) {
            param.append("Files[]", newRescFiles[x]);
        }
        param.append("ItemID", itemIDRef.current.value)
        param.append("Type", rescType)
        await UploadItemFiles(param)

        // 刷新页面
        handleSearch()
        //将新文件置空
        dispatch(setNewRescFiles([]))
    }

    //根据item_id搜索
    const handleSearch = () => {
        GetItemFiles(itemIDRef.current.value)
            .then(item => {
                dispatch(setItem(item))
            })
    }

    return (
        <Grid container>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <FormControl component="fieldset" style={{marginLeft: '10px', marginTop: '20px'}}>
                    <RadioGroup
                        aria-label="resource-type"
                        name="controlled-radio-buttons-group"
                        value={rescType}
                        onChange={handleRscTypeChange}
                        row={true}
                        sx={{
                            textAlign: "center",
                            ml: '35px',
                            '& .MuiRadio-root.Mui-checked': {
                                color: 'white',
                            }
                        }}>
                        <RadioItem value="main" title="主文件" icon={mainIcon}/>
                        <RadioItem value="preview" title="预览图" icon={previewIcon}/>
                        <RadioItem value="refs" title="附件" icon={refIcon}/>
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12}
                  style={{display: "flex", alignItems: "flex-end", justifyContent: "center", marginTop: '50px'}}>
                {/*搜索组件*/}
                <SimpleInput
                    ref={itemIDRef}
                    name="item_id"
                    marginRight='0'
                    placeholder="输入item_id"
                    value={itemID}
                />
                <IconButton sx={{
                    ml: '8px',
                    backgroundColor: alpha('#0aa858', 0.6),
                    boxShadow: '0 0 3px #0aa858',
                    '&:hover': {
                        boxShadow: '0 0 3px #403D39',
                    }
                }}
                            onClick={handleSearch}
                >
                    <SearchIcon/>
                </IconButton>
            </Grid>


            <Grid item xs={12} style={{
                marginTop: '10px',
                display: "flex",
                flexWrap: 'nowrap',
                justifyContent: "space-around",
            }}>

                {/*显示文件详情*/}
                <Box sx={{width: '25%', padding: '50px'}}>
                    <FileDetail/>
                </Box>

                <div>
                    <Typography variant="h6" component='div'
                                color='text.secondary'
                                sx={{mt: '5px', ml: '15px'}}>
                        {item && item.ItemName}
                    </Typography>
                    {/*文件拖拽组件*/}
                    <DragDrop handleDropFile={handleMulti} color="#001E3C">
                        <Uploader
                            width="800px"
                            height="500px"
                            onFileUpload={onFileUpload}
                        />
                    </DragDrop>
                </div>
                {/*显示拖拽的文件信息*/}
                <FilesShow>
                    <Box sx={{display: "flex", justifyContent: "center", mt: '50px'}}>
                        <UploadButton marginTop="50px" onClick={onUploadClick}/>
                    </Box>
                </FilesShow>

            </Grid>
        </Grid>
    );
}

export default Upload_;