import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import UploadedFile from "./UploadedFile";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setNewRescFiles} from "./uploadSlice";
import {DeleteFile} from "../../../api/file.service";
import {openAlert} from "../../../components/alert/alertSlice";

function FilesShow(props) {

    const {newRescFiles, item, rescType} = useSelector(selectUploadItemResc);
    const [originFiles, setOriginFiles] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!item) return
        switch (rescType) {
            case 'main':
                setOriginFiles(item.Main);
                break;
            case 'preview':
                setOriginFiles(item.Preview)
                break;
            case 'refs':
                setOriginFiles(item.Refs)
                break;
        }
    }, [rescType, item])

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

    const handleNewFileDel = (name) => {
        dispatch(setNewRescFiles(newRescFiles.filter(item=>item.name!==name)))
    }

    const handleOriginFileDel = (fileId, bucket, key) => {
        DeleteFile({
            FileId:fileId,
            Bucket:bucket,
            Key:key
        }) .then(r => {
            dispatch(openAlert());
        })
    }


    return (
        <Box sx={{width: '25%', padding: '50px'}}>
            {/*原始文件*/}
            已上传: {
            originFiles.length > 0 ?
                <Stack direction="column" sx={{mt: '30px', color: 'black', display: "flex"}}>
                    {
                        originFiles.map((item, index) => {
                                return <UploadedFile key={index}
                                                     file={item}
                                                     error={true}
                                                     handleDel={() => handleOriginFileDel(item.ID,item.Bucket,item.Key)}
                                />
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
                                        handleDel={() => handleNewFileDel(item.name)}
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