import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import {Link} from "react-router-dom";

function LinkToButton(props) {
    const {linkTo, onClick} = props;

    return (
        <Tooltip title="上传">
            <Link to={linkTo}>
                <IconButton onClick={onClick}>
                    <FileUploadRoundedIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Link>
        </Tooltip>

    );
}

export default LinkToButton;