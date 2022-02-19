import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Upload from "../../../features/uploader/upload";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import videoIcon from '../../../assets/admin/video.svg';
import docIcon from '../../../assets/admin/doc.svg';
import pluginIcon from '../../../assets/admin/plugin.svg';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DragDrop from "../../../common/drag-drop";
import UploadedFile from "../../../features/uploader/uploaded-file";

const radioStyle = {

    '& .MuiSvgIcon-root': {
        fontSize: 17,
    }
}

const iconStyle = {
    width: "50px",
    height: "50px"
}

function FileUpload(props) {
    const [rescValue, setRescValue] = useState("video");
    const [rescFiles, setRescFiles] = useState([]);

    const handleRscTypeChange = e => {
        setRescValue(e.target.value)
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
        setRescFiles([...rescFiles, ...files]); //fuck, 我怎么没想到
    };

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <FormControl component="fieldset" style={{marginLeft: '10px', marginTop: '20px'}}>
                    <RadioGroup
                        aria-label="resource-type"
                        name="controlled-radio-buttons-group"
                        value={rescValue}
                        onChange={handleRscTypeChange}
                        row={true}
                        sx={{
                            textAlign: "center",
                            ml: '35px',
                            '& .MuiRadio-root.Mui-checked': {
                                color: 'white',
                            }
                        }}
                    >
                        <FormControlLabel value="video" control={<Radio sx={radioStyle}/>}
                                          label={
                                              <Tooltip title="视频">
                                                  <IconButton sx={{mr: '60px'}}>
                                                      <img alt="icon" className="logo" src={videoIcon}
                                                           style={iconStyle}/>
                                                  </IconButton>
                                              </Tooltip>
                                          }/>
                        <FormControlLabel value="doc" control={<Radio sx={radioStyle}/>}
                                          label={
                                              <Tooltip title="文档 & 文件">
                                                  <IconButton sx={{mr: '60px'}}>
                                                      <img alt="icon" className="logo" src={docIcon}
                                                           style={iconStyle}/>
                                                  </IconButton>
                                              </Tooltip>
                                          }/>
                        <FormControlLabel value="plugin" control={<Radio sx={radioStyle}/>}
                                          label={
                                              <Tooltip title="软件 & 插件">
                                                  <IconButton>
                                                      <img alt="icon" className="logo" src={pluginIcon}
                                                           style={iconStyle}/>
                                                  </IconButton>
                                              </Tooltip>
                                          }/>
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} style={{textAlign: "center", marginTop: '50px'}}>
                <Stack direction="row"
                       justifyContent="space-around"
                       // alignItems="center"
                       spacing={0}
                >
                    <Box sx={{width:'10%'}}>

                    </Box>

                    <DragDrop handleDropFile={handleMulti}
                              width="800px"
                              height="500px"
                              color="#001E3C"
                    >
                        <Upload
                            width="800px"
                            height="500px"
                            onFileUpload={onFileUpload}
                        />
                    </DragDrop>

                    <Stack direction="column" sx={{mt:'30px', color:'black'}} >
                        {
                            rescFiles && rescFiles.map((item, index) => {
                                    console.log(item)
                                    return <UploadedFile key={index} fileName={item.name} error={true}/>
                                }
                            )
                        }
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default FileUpload;