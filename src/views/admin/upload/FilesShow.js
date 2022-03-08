import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import UploadedFile from "./UploadedFile";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setNewRescFiles} from "./uploadSlice";
import {DeleteFile} from "../../../api/file.service";
import {openAlert} from "../../../components/alert/ops/alertSlice";
import AlertDialog from "../../../components/alert/confirm/AlertDialog";
import {setOpen} from "../../../components/alert/confirm/confirmSlice";
import CustomizedDialogs from "../../../components/CustomizedDialogs";
import VideoPlayer from "../../../components/player/VideoPlayer";
import SimplePlayer from "../../../components/player/SimplePlayer";

function FilesShow(props) {

    const {newRescFiles, item, rescType} = useSelector(selectUploadItemResc);
    const [originFiles, setOriginFiles] = useState([]);
    const [openView, setOpenView] = React.useState(false);
    const [viewItem, setViewItem] = React.useState(null);
    const dispatch = useDispatch();

    const handleView = (item) => {
        console.log("-------", item)
        setViewItem(item);
        setOpenView(true);
    };
    const handleClose = () => {
        setOpenView(false);
    };


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

    //提示组件
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

    //删除新增的文件
    const handleNewFileDel = (name) => {
        dispatch(setOpen({
            open: true,
            okHandle: () => {
                dispatch(setNewRescFiles(newRescFiles.filter(item => item.name !== name)))
            }
        }));
    }

    //删除已上传的文件
    const handleOriginFileDel = (fileId, bucket, key) => {
        const ops = () => DeleteFile({
            FileId: fileId,
            Bucket: bucket,
            Key: key
        }).then(r => {
            dispatch(openAlert());
        })
        dispatch(setOpen({
            open: true,
            okHandle: ops
        }));
    }

    //todo:清空文件 - 2022-3-6 记录

    return (
        <Box sx={{width: '25%', padding: '50px'}}>
            {/*原始文件*/}
            已上传:
            {
                originFiles.length > 0 ?
                    <Stack direction="column" sx={{mt: '30px', color: 'black', display: "flex"}}>
                        {
                            originFiles.map((item, index) => {
                                    return <UploadedFile key={index}
                                                         file={item}
                                                         error={true}
                                                         handleView={() => handleView(item)}
                                                         handleDel={() => handleOriginFileDel(item.ID, item.Bucket, item.Key)}
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
                                        handleView={() => handleView(item)}
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

            {/*提示组件*/}
            <AlertDialog title="删除?" note="删除后不可恢复, 请谨慎操作*_*"/>

            {/*预览文件组件*/}
            <CustomizedDialogs open={openView}
                               handleClose={handleClose}
                               title={viewItem && (viewItem.name || viewItem.Name)}>
                {viewItem &&
                <SimplePlayer
                    size={{
                        height: '350px',
                        width: '570px',
                    }}
                    videoSrc={{
                        type: `${viewItem.QnLink ?  'application/x-mpegURL' : 'video/mp4'}`,
                        src: `${viewItem.QnLink ? viewItem.QnLink : URL.createObjectURL(viewItem)}`
                    }}/>}
            </CustomizedDialogs>
        </Box>
    );
}

export default FilesShow;