import React, {useEffect} from 'react';
import {ItemRescType} from "../../../utils/constant/constant";
import Stack from "@mui/material/Stack";
import DragDrop from "../../../components/DragDrop";
import Uploader from "../../../components/Uploader";
import styled from "styled-components";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AlertDialog from "../../../components/alert/confirm/AlertDialog";
import SimplePlayer from "../../../components/player/SimplePlayer";
import {isVideo} from "../../../utils/ToolUtil";

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
    const {name, uploadType, setUploadFiles, resc, handleDelete} = props
    const [showList, setShowList] = React.useState([]);

    useEffect(() => {
        let showLinks = []
        resc && resc.forEach(data => {
            showLinks.push({
                link: data.QnLink,
                fileId: data.ID,
                bucket: data.Bucket,
                key: data.Key,
                type: data.Format
            })
        })
        setShowList(showLinks)
    }, [resc])

    const handleUpload = (event) => {
        handleDrag(event.target.files);
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
            showFiles.push({
                link: URL.createObjectURL(files[i]),
                fileId: files[i].name,
                type: files[i].type
            })
        }
        setShowList([...showList, ...showFiles])
        setUploadFiles(files);
    };

    const handleDel = (file) => {
        //删除的是新上传的文件(还未保存到数据库， 只是提交到了页面)
        setShowList(showList.filter(f => f.link !== file.link))
        handleDelete(file, name)
    }


    function getShowConponent(file, index) {
        return <div style={fileShowContainer}>
            {
                isVideo(file.type) ?
                    <SimplePlayer videoSrc={{
                        type: `${file.key ? 'application/x-mpegURL' : 'video/mp4'}`,
                        src: file.link}}/>
                    :
                    <StyledImg key={'show'.concat(index)} src={file.link}/>
            }
            <HighlightOffIcon key={'icon'.concat(index)} fontSize="large" sx={deleteIconStyle}
                              onClick={() => handleDel(file)}/>
        </div>
    }

    return (
        <div style={{display: "flex", flexDirection: 'column', gap: '10px'}}>
            <div style={{fontSize: '18px', color: '#00a896', flexGrow: 1}}>{ItemRescType[name]}:</div>

            {/*提示组件*/}
            <AlertDialog title="删除?" note="删除后不可恢复, 请谨慎操作*_*"/>

            {/*这里好像用gap能够把间隔拉开*/}
            <Stack direction={'row'} gap={2} flexWrap={'wrap'} alignItems={"start"} justifyContent={"start"}>
                {
                    showList && showList.map((file, index) => getShowConponent(file, index))
                }
                {
                    showList.length > 0 && uploadType === 'single' ? <React.Fragment/> :
                        <DragDrop handleDropFile={handleDrag} color="#001E3C" width="200px">
                            <Uploader width="200px" onFileUpload={(event) => handleUpload(event)}/>
                        </DragDrop>
                }

            </Stack>
        </div>
    );
}

export default UploadArea;