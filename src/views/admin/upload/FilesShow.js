import React from 'react';
import Stack from "@mui/material/Stack";
import UploadedFile from "./UploadedFile";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {selectUploadItemResc} from "./uploadSlice";

function FilesShow(props) {

    const {originFiles} = props;
    const {newRescFiles} = useSelector(selectUploadItemResc);

    const Tips = (content) => {
         return <Typography color="#EB5E28"
                        sx={{
                            mt: '30px',
                            ml: '20px',
                            fontStyle: 'italic',
                            fontSize: '16px',
                            lineHeight: '1.1em'
                        }}>
             {content}
            </Typography>

    }

    return (
        <Box  sx={{width: '25%', padding:'50px'}}>
            {/*原始文件*/}
            原始文件: {
            originFiles.length > 0 ?
                <Stack direction="column" sx={{mt: '30px', color: 'black', display: "flex"}}>
                    {
                        originFiles.map((item, index) => {
                                return <UploadedFile key={index}
                                                     file={item}
                                                     error={true}/>
                            }
                        )
                    }
                </Stack>
                :
                Tips("还没有任何文件哦, 先上传一些吧")
        }
            <br/>
            <br/>
            <br/>
            {/*新上传的文件*/}
            待上传:
            {
                newRescFiles.length > 0 ?
                    <Stack direction="column" sx={{mt: '30px', color: 'black', display: "flex"}}>
                        {
                            newRescFiles.map((item, index) => {
                                    return <UploadedFile
                                        key={index}
                                        file={item}
                                        error={true}
                                    />
                                }
                            )
                        }
                    </Stack>
                    :
                    Tips("还没有选择任何文件哦")
            }

            {props.children}

        </Box>
    );
}

export default FilesShow;