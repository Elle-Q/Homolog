import React, {createRef} from 'react';
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/material/styles";

function Upload(props) {
    const {width, height, onFileUpload} = props;
    const fileRef = createRef();

    return (
        <div>
            <input type="file"
                   multiple
                   name="file-upload"
                   ref={fileRef}
                   onChange={onFileUpload}
                   style={{display: 'none',}}/>
            <IconButton onClick={() => fileRef.current.click()}
                        sx={{
                            maxWidth: {width},
                            maxHeight: {height},
                            borderRadius: '15px',
                            border:"5px dotted #403D39",
                            backgroundColor: alpha('#001E3C', 0.3),
                            '&:hover': {
                                backgroundColor: alpha('#001E3C', 0.1)
                            }
                        }}
            >
                <p>
                    <span style={{fontSize: '18px', color: '#3399ff'}}>+ 选择文件 </span>
                    <br/>
                    <span style={{fontSize: '14px', color: '#3399ff'}}>(拖动文件到此处)</span>
                </p>
            </IconButton>
        </div>
    );
}

export default Upload;