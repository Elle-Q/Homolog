import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Uploader from "../../../components/Uploader";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import videoIcon from '../../../assets/admin/video.svg';
import docIcon from '../../../assets/admin/doc.svg';
import pluginIcon from '../../../assets/admin/plugin.svg';
import Grid from "@mui/material/Grid";
import DragDrop from "../../../components/DragDrop";
import FileDetail from "./FileDetail";
import SearchIcon from '@mui/icons-material/Search';
import FilesShow from "./FilesShow";
import {InputWithHeader} from "../../../components/ui/CustomInput";
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setNewRescFiles, setSelectedFileFormat} from "./uploadSlice";
import {alpha} from "@mui/system";
import UploadButton from "../../../components/ui/UploadButton";
import {UploadItemFiles} from "../../../api/item.service";

const radioStyle = {

    '& .MuiSvgIcon-root': {
        fontSize: 17,
    }
}

const iconStyle = {
    width: "50px",
    height: "50px"
}

function Upload(props) {
    const [originalRescFiles, setOriginalRescFiles] = useState([]);
    const [file, setFile] = useState(null);
    const {selectedFileFormat, newRescFiles} = useSelector(selectUploadItemResc);
    const dispatch = useDispatch();

    const handleRscTypeChange = e => {
        dispatch(setSelectedFileFormat({fileFormat: e.target.value}))
    }

    //多文件上传
    const onFileUpload = (event) => {
        handleMulti(event.target.files);
    };

    const handleMulti = (event) => {
        let files = [];
        setFile(event[0])
        for (let i = 0; i < event.length; i++) {

            files.push({
                size: event[i].size,
                format: event[i].type,
                name: event[i].name,
            })
        }
        //fuck, 我怎么没想到
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

        let param = new FormData();

        for (let x = 0; x < newRescFiles.length; x++) {
            param.append("Files[]",file);
        }

        param.append("ItemID", 1)
        await UploadItemFiles(param)
    }

    return (
        <Grid container>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <FormControl component="fieldset" style={{marginLeft: '10px', marginTop: '20px'}}>
                    <RadioGroup
                        aria-label="resource-type"
                        name="controlled-radio-buttons-group"
                        value={selectedFileFormat}
                        onChange={handleRscTypeChange}
                        row={true}
                        sx={{
                            textAlign: "center",
                            ml: '35px',
                            '& .MuiRadio-root.Mui-checked': {
                                color: 'white',
                            }
                        }}>
                        <RadioItem value="video" title="视频" icon={videoIcon}/>
                        <RadioItem value="doc" title="文档 & 文件" icon={docIcon}/>
                        <RadioItem value="plugin" title="软件 & 插件" icon={pluginIcon}/>
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12}
                  style={{display: "flex", alignItems: "flex-end", justifyContent: "center", marginTop: '50px'}}>
                {/*搜索组件*/}
                <InputWithHeader
                    name="item_id"
                    marginRight='0'
                    placeholder="输入item_id"
                    // value={data.Name}
                    // onChange={handleInputChange}
                />
                <IconButton sx={{
                    ml:'8px',
                    backgroundColor: alpha('#3399ff', 0.6),
                    boxShadow: '0 0 5px #3399ff',
                    '&:hover':{
                        boxShadow: '0 0 5px #403D39',
                    }
                }}>
                    <SearchIcon/>
                </IconButton>
            </Grid>

            <Grid item xs={12} style={{
                marginTop: '30px',
                display: "flex",
                flexWrap: 'nowrap',
                justifyContent: "space-around",
            }}>

                {/*显示文件详情*/}
                <Box sx={{width: '25%', padding: '50px'}}>
                     <FileDetail />
                </Box>

                {/*文件拖拽组件*/}
                <DragDrop handleDropFile={handleMulti}  color="#001E3C">
                    <Uploader
                        width="800px"
                        height="500px"
                        onFileUpload={onFileUpload}
                    />
                </DragDrop>

                {/*显示拖拽的文件信息*/}
                <FilesShow originFiles={originalRescFiles}>
                    <Box sx={{display: "flex", justifyContent: "center", mt: '50px'}}>
                        <UploadButton marginTop="50px" onClick={onUploadClick}/>
                    </Box>
                </FilesShow>



            </Grid>
        </Grid>
    );
}

export default Upload;