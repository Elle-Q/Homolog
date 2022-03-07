import React from 'react';
import linkIcon from "../../../assets/admin/link.svg";
import linkErrIcon from "../../../assets/admin/link_err.svg";
import Box from "@mui/material/Box";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import {setSelectedFile, setNewRescFiles, selectUploadItemResc} from "./uploadSlice";
import {useDispatch, useSelector} from "react-redux";

function UploadedFile(props) {
    const {file, error, handleDel, handleView} = props;
    const {selectedFile} = useSelector(selectUploadItemResc);

    const dispatch = useDispatch();

    const handleFileLabelClick = (e) => {
        dispatch(setSelectedFile({file:file}))
    }

    return (
        <Box
            sx={{
            display: "flex",
            justifyContent: "end",
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: '#403D39',
            }
        }}>
            <Box sx={{display: "flex", alignItems: "flex-end"}}
                 onClick={handleFileLabelClick}
            >
                <img alt="icon" className="file-link" src={`${error ? linkErrIcon : linkIcon}`}
                     style={{width: "20px", height: "20px"}}/>
                <span style={{marginRight: '50px'}}>{file && (file.Name || file.name)}</span>
            </Box>

            <Box sx={{display: "flex", alignItems: "flex-end"}}>
                <DeleteRoundedIcon
                    onClick={handleDel}
                    fontSize="small"
                    sx={{
                        mr: '10px',
                        '&:hover': {
                            color: 'red'
                        }
                    }}
                />
                <RemoveRedEyeRoundedIcon
                    onClick={handleView}
                    fontSize="small"
                    sx={{
                        mr: '10px',
                        '&:hover': {
                            color: 'green'
                        }
                    }}
                />
            </Box>

        </Box>
    );
}

export default UploadedFile;