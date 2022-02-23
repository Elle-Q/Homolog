import React from 'react';
import linkIcon from "../../../assets/admin/link.svg";
import linkErrIcon from "../../../assets/admin/link_err.svg";
import Box from "@mui/material/Box";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import {setSelectedFileName} from "./uploadSlice";
import {useDispatch} from "react-redux";

function UploadedFile(props) {
    const {fileName, error} = props;
    const dispatch = useDispatch();

    const handleFileLabelClick = () => {
        dispatch(setSelectedFileName({fileName:fileName}))
    }

    return (
        <Box
            onClick={handleFileLabelClick}
            sx={{
            display: "flex",
            justifyContent: "end",
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: '#403D39',
            }
        }}>
            <Box sx={{display: "flex", alignItems: "flex-end"}}>
                <img alt="icon" className="file-link" src={`${error ? linkErrIcon : linkIcon}`}
                     style={{width: "20px", height: "20px"}}/>
                <span style={{marginRight: '50px'}}>{fileName}</span>
            </Box>

            <Box sx={{display: "flex", alignItems: "flex-end"}}>
                <DeleteRoundedIcon
                    onClick={handleFileLabelClick}
                    fontSize="small"
                    sx={{
                        mr: '10px',
                        '&:hover': {
                            color: 'red'
                        }
                    }}
                />
                <RemoveRedEyeRoundedIcon
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