import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Action(props) {
    const {data, handleOpen, handleEdit, handleDel} = props

    return (
        <React.Fragment>
            <Tooltip title="删除">
                <IconButton onClick={() => handleDel()}>
                    <DeleteIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="编辑">
                <IconButton onClick={() => handleEdit(data)}>
                    <EditIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="查看">
                <IconButton onClick={() => handleOpen(data)}>
                    <RemoveRedEyeIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

export default Action;