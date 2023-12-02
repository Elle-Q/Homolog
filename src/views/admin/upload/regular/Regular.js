import React from 'react';
import UploadArea from "../UploadArea";
import {CancelButton, OKButton} from "../../../../components/ui/CustomButton";
import {UploadItemFiles} from "../../../../api/item.service";
import {useDispatch, useSelector} from "react-redux";
import {selectUploadItemResc} from "../uploadSlice";
import {DeleteFile} from "../../../../api/file.service";
import {openAlert} from "../../../../components/alert/ops/alertSlice";
import {setOpen} from "../../../../components/alert/confirm/confirmSlice";

function Regular(props) {
    const {itemID, item} = useSelector(selectUploadItemResc);
    const [main, setMain] = React.useState([]);
    const [preview, setPreview] = React.useState([]);
    const [attachment, setAttachment] = React.useState([]);
    const dispatch = useDispatch();

    //取消文件上传
    const handleCancel = () => {
        //将文件置空
        setMain([])
        setPreview([])
        setAttachment([])
    }

    // 上传并保存文件
    const handleSave = async () => {
        let param = new FormData();
        for (let x = 0; x < main.length; x++) {
            param.append("Main[]", main[x]);
        }
        for (let x = 0; x < preview.length; x++) {
            param.append("Preview[]", preview[x]);
        }
        for (let x = 0; x < attachment.length; x++) {
            param.append("Attachment[]", attachment[x]);
        }
        param.append("ItemID", itemID)

        await UploadItemFiles(param)
    }


    const handleDelete = (file, name) => {
        //删除的是新上传的文件(还未保存到数据库， 只是提交到了页面)
        if (!Number.isFinite(file.fileId)) {
            if (name === 'Main') {
                setMain(main.filter(f => f.name !== file.fileId))
            } else if (name === 'Preview') {
                setPreview(preview.filter(f => f.name !== file.fileId))
            } else {
                setAttachment(attachment.filter(f => f.name !== file.fileId))
            }
            return;
        }
        const ops = () => DeleteFile({
            FileId: file.fileId,
            Bucket: file.bucket,
            Key: file.key
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
            <UploadArea key="Main" name='Main' uploadType='single'
                        resc={item && item.Main}
                        setUploadFiles={(file) => setMain(file)}
                        handleDelete={handleDelete}/>
            <UploadArea key="Preview" name='Preview' uploadType='multi'
                        resc={item && item.Preview}
                        setUploadFiles={(files) => setPreview([...preview, ...files])}
                        handleDelete={handleDelete}/>
            <UploadArea key="Attachment" name='Attachment' uploadType='single'
                        resc={item && item.Attachment}
                        setUploadFiles={(file) => setAttachment(file)}
                        handleDelete={handleDelete}/>
        </React.Fragment>
    );
}

export default Regular;