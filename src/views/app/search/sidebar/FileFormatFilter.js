import React from 'react';
import Stack from "@mui/material/Stack";
import {RatioInput} from "../../../../components/ui/RatioInput";

const formats = {
    zip: ".zip",
    rar: ".rar",
    mp4: ".mp4",
    blend: ".blend",
    mov: ".mov",
    pdf: ".pdf",
    jpg: ".jpg",
    png: ".png",
    gif: ".gif",
}


function FileFormatFilter(props) {

    return (
        <React.Fragment>
            <h4 style={{color: '#CCC5B9'}}> 包含格式 </h4>
            <Stack>
                {
                    Object.keys(formats).map((k, index) => {
                        return (
                            <label key={index} style={{color: '#EB5E28', position: 'relative',marginBottom:'5px'}}>
                                <span style={{color: '#999', fontSize: '18px' ,marginLeft:'5px', textAlign: "center"}}>{formats[k]}</span>
                                <span style={{color: '#999', position:'absolute',right:'30px', top:'3px', fontSize: '12px', textAlign: "center"}}>(12)</span>
                                <RatioInput id="4" type="radio" value="4"/>
                            </label>
                        )
                    })
                }
            </Stack>
        </React.Fragment>
    );
}

export default FileFormatFilter;