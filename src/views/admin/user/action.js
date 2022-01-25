import React from 'react';
import Button from "@mui/material/Button";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Action(props) {
    return (
        <React.Fragment>
            <Tooltip title="禁用账户">
                <IconButton>
                    <DoNotDisturbIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="查看">
                <IconButton>
                    <RemoveRedEyeIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

export default Action;