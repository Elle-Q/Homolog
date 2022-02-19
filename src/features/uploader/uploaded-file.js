import React from 'react';
import linkIcon from "../../assets/admin/link.svg";
import linkErrIcon from "../../assets/admin/link_err.svg";
import IconButton from "@mui/material/IconButton";
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Box from "@mui/material/Box";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function UploadedFile(props) {
    const {fileName, error} = props;

    return (

        <Box sx={{
            display: "flex",
            justifyContent: "end",
            borderRadius: '10px',
            '&:hover': {
                backgroundColor: '#403D39',
            }
        }}>
            <Box>
                <IconButton>
                    <img alt="icon" className="file-link" src={`${error ? linkErrIcon : linkIcon}`}
                         style={{width: "20px", height: "20px"}}/>
                </IconButton>
                <span style={{marginRight: '50px'}}>{fileName}</span>
            </Box>

            <Box>
                <FileUploadRoundedIcon
                    sx={{
                        mr: '10px',
                        '&:hover': {
                            color: '#3399FF'
                        }
                    }}
                />
                <DeleteRoundedIcon
                    sx={{
                        mr: '10px',
                        '&:hover': {
                            color: 'red'
                        }
                    }}
                />
            </Box>
        </Box>
    );
}

export default UploadedFile;