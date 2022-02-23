import React from 'react';
import {alpha} from "@mui/system";
import uploadSvg from "../../assets/admin/upload1.svg";
import IconButton from "@mui/material/IconButton";
import {Tooltip} from "@mui/material";

function UploadButton({marginTop}) {
    return (
        <Tooltip title="上传所有">
            <IconButton
                sx={{
                    backgroundColor: "#403D39",
                    '&:hover': {
                        boxShadow: '0 0 5px #403D39',
                        cursor: "pointer",
                        color: "#3399ff",
                        '& *': {
                            transform: 'scale(1.1)',
                            transition: 'transform 0.4s ease-in-out',
                        }
                    }
                }}>
                <img alt="icon" className="logo" src={uploadSvg}
                     style={{width: '80px'}}/>
            </IconButton>
        </Tooltip>
    );
}

export default UploadButton;