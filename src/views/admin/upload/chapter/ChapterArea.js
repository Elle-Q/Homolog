import React, {useEffect} from "react";
import {CancelButton, OKButton} from "../../../../components/ui/CustomButton";
import UploadArea from "../UploadArea";
import {UploadItemChapters} from "../../../../api/item.service";
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc, setRefesh} from "../uploadSlice";
import {DeleteChapterFile, DeleteFile} from "../../../../api/file.service";
import {openAlert} from "../../../../components/alert/ops/alertSlice";
import {setOpen} from "../../../../components/alert/confirm/confirmSlice";

function ChapterArea(props) {
    const {itemID} = useSelector(selectUploadItemResc);
    const {chapter} = props
    const [main, setMain] = React.useState([]);
    const [episodes, setEpisodes] = React.useState([]);
    const dispatch = useDispatch();

    const handleCancel = () => {
        //将章节置空
        dispatch(setRefesh(true))
    }

    // 上传并保存文件
    const handleSave = async () => {
        let param = new FormData();
        for (let x = 0; x < main.length; x++) {
            param.append("Main[]", main[x]);
        }
        for (let x = 0; x < episodes.length; x++) {
            param.append("Episodes[]", episodes[x]);
        }
        param.append("ItemID", itemID)
        param.append("ChapterID", chapter.ID)

        await UploadItemChapters(param)

        setMain([])
        setEpisodes([])
    }

    //刪除章节信息
    const handleDelete = (chapter, file, name) => {
        if (!Number.isFinite(file.fileId)) {
            if (name === 'Main') {
                setMain(main.filter(f => f.name !== file.fileId))
            } else {
                setEpisodes(episodes.filter(f => f.name !== file.fileId))
            }
            return
        }
        const ops = () => DeleteChapterFile({
            ChapterId: chapter.ID,
            FileId: file.fileId,
            Bucket: file.bucket,
            Key: file.key,
            type: name
        }).then(r => {
            dispatch(openAlert());
        })
        dispatch(setOpen({
            open: true,
            okHandle: ops
        }));
    }

    return (
        <React.Fragment>
            <div style={{display: 'flex', gap: '10px'}}>
                <OKButton handleClick={handleSave}/>
                <CancelButton handleClick={handleCancel}/>
            </div>

            <React.Fragment>
                <UploadArea name='Main' uploadType='single'
                            resc={chapter.Main}
                            setUploadFiles={(files) => setMain([...main, ...files])}
                            handleDelete={(file, name) => handleDelete(chapter,file, name)}/>

                <UploadArea name='Episodes' uploadType='multi'
                            resc={chapter.Episodes}
                            setUploadFiles={(files) => setEpisodes([...episodes, ...files])}
                            handleDelete={(file, name) => handleDelete(chapter, file, name)}/>
            </React.Fragment>
        </React.Fragment>
    );
}

export default ChapterArea;