import React, {useEffect} from 'react';
import {ItemRescType} from "../../../utils/constant/constant";
import Stack from "@mui/material/Stack";
import DragDrop from "../../../components/DragDrop";
import Uploader from "../../../components/Uploader";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setItem} from "./uploadSlice";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {DeleteFile} from "../../../api/file.service";
import {openAlert} from "../../../components/alert/ops/alertSlice";
import {setOpen} from "../../../components/alert/confirm/confirmSlice";
import AlertDialog from "../../../components/alert/confirm/AlertDialog";

const StyledImg = styled.img`
  width: 200px;
  aspect-ratio: 4/3;
`

const deleteIconStyle = {
    position: "absolute",
    right: "-15px",
    top: "-15px",

    '&:hover': {
        color: "red",
        transform: 'scale(1.1)',
        transition: 'transform 0.4s ease-in-out',
    }
}

const fileShowContainer = {
    position: "relative",
    width: '210px',
    aspectRatio: '4/3',
    textAlign: 'center',
    border: "5px dotted #403D39"
}

function UploadArea(props) {
    const {name, uploadFiles, setUploadFiles, uploadType} = props
    const {item} = useSelector(selectUploadItemResc);
    const [showList, setShowList] = React.useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let links = []
        item && item[name].forEach(resc => {
            links.push({
                link: resc.QnLink,
                fileId: resc.ID,
                bucket: resc.Bucket,
                key: resc.Key
            })
        })
        setShowList(links)
    }, [item])

    const handleUpload = (event, type) => {
        handleDrag(event.target.files, type);
    };

    //拖拽或者上传文件后, 在页面显示文件 (现在只实现了图片的显示, 后面具体的视频, 压缩包需要采用其他的形式显示)
    const handleDrag = (dragFiles, type) => {
        let files = []
        let showFiles = []
        if (uploadType === 'single') {
            files.push(dragFiles[0]);
        } else {
            files = dragFiles;
        }
        for (let i = 0; i < files.length; i++) {
            console.log(files[i])
            showFiles.push({
                link: URL.createObjectURL(files[i]),
                fileId: files[i].name,
            })
        }
        setUploadFiles(files);
        setShowList([...showList, ...showFiles])
    };

    const handleDelete = (file) => {
        //删除的是新上传的文件(还未保存到数据库， 只是提交到了页面)
        if (!Number.isFinite(file.fileId)) {
            setUploadFiles(uploadFiles.filter(f => f.name !== file.fileId))
            setShowList(showList.filter(f => f.link !== file.link))
            return;
        }
        const ops = () => DeleteFile({
            FileId: file.fileId,
            Bucket: file.bucket,
            Key: file.key
        }).then(r => {
            dispatch(openAlert());
            setShowList(showList.filter(f => f.link !== file.link)) //移除页面上显示的元素
        })
        dispatch(setOpen({
            open: true,
            okHandle: ops
        }));
    }

    return (
        <div style={{display: "flex", flexDirection: 'column', gap: '10px'}}>
            <div style={{fontSize: '18px', color: '#00a896', flexGrow: 1}}>{ItemRescType[name]}:</div>

            {/*提示组件*/}
            <AlertDialog title="删除?" note="删除后不可恢复, 请谨慎操作*_*"/>

            {/*这里好像用gap能够把间隔拉开*/}
            <Stack direction={'row'} gap={2} flexWrap={'wrap'} alignItems={"start"} justifyContent={"start"}>
                {
                    showList && showList.map((file, index) => {
                        return <div style={fileShowContainer}>
                            <StyledImg key={'show'.concat(index)} src={file.link}/>
                            <HighlightOffIcon key={'icon'.concat(index)} fontSize="large" sx={deleteIconStyle}
                                              onClick={() => handleDelete(file)}/>
                        </div>
                    })
                }

                {
                    showList.length > 0 && uploadType === 'single' ? <React.Fragment/> :
                        <DragDrop handleDropFile={handleDrag} color="#001E3C" width="200px">
                            <Uploader width="200px" onFileUpload={(event) => handleUpload(event, name)}/>
                        </DragDrop>
                }

            </Stack>
        </div>
    );
}

export default UploadArea;