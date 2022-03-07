import React from 'react';
import ItalicLabel from "../../../components/ui/ItalicLabel";
import {ByteToM} from "../../../utils/MathUtil";
import {useSelector} from "react-redux";
import {selectUploadItemResc} from "./uploadSlice";
import InputLabel from "../../../components/ui/InputLabel";
import {StringToDate} from "../../../utils/DateUtil";

function FileDetail(props) {
    const {selectedFile} = useSelector(selectUploadItemResc);

    if (!selectedFile) return <></>;

    return (
        <React.Fragment>
            <ItalicLabel name="大小" value={`${ByteToM(selectedFile.Size || selectedFile.size)}M`}/>
            <ItalicLabel name="格式" value={selectedFile.Format || selectedFile.type}/>
            <InputLabel name="名称*" value={selectedFile.Name || selectedFile.name}/>
            <ItalicLabel name="七牛空间" value={selectedFile.Bucket || ''}/>
            <ItalicLabel name="key" value={selectedFile.Key || ''}/>
            <ItalicLabel name="上传时间" value={StringToDate(selectedFile.CreateTime) || '' }/>
        </React.Fragment>
    );
}

export default FileDetail;