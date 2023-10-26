import React, {createRef} from 'react';
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/material/styles";

function Uploader(props) {
    const {width, onFileUpload} = props;
    const fileRef = createRef();

    return (
        <React.Fragment>
            <input type="file"
                   multiple
                   name="file-upload"
                   ref={fileRef}
                   onChange={onFileUpload}
                   style={{display: 'none',}}/>
            <IconButton onClick={() => fileRef.current.click()}
                        sx={{
                            width: {width},
                            aspectRatio: '4/3',
                            borderRadius: '15px',
                            border: "5px dotted #403D39",
                            backgroundColor: alpha('#0d0d10', 0.3),
                            '&:hover': {
                                backgroundColor: alpha('#1542f5', 0.1)
                            }
                        }}
            >
                <p>
                    <span style={{fontSize: '18px', color: '#006fff'}}>+ 选择文件 </span>
                    <br/>
                    <span style={{fontSize: '14px', color: '#006fff'}}>(拖动文件到此处)</span>
                </p>
            </IconButton>
        </React.Fragment>
    );
}

export default Uploader;