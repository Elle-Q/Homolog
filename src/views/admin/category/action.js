import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {useDispatch} from "react-redux";
import {open} from "./catSlice";


function Action(props) {
    const {data, handleDel} = props
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(open({
            readOnly:true,
            type:"show",
            data:data,
        }))
    }

    const handleEdit = () => {
        dispatch(open({
            readOnly:false,
            type:"edit",
            data:data,
        }))
    }

    return (
        <React.Fragment>
            <Tooltip title="删除">
                <IconButton onClick={() => handleDel(data.ID)}>
                    <DeleteIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="编辑">
                <IconButton onClick={handleEdit}>
                    <EditIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="查看">
                <IconButton onClick={handleOpen}>
                    <RemoveRedEyeIcon sx={{color: '#2d85f0'}} fontSize='small'/>
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}

export default Action;