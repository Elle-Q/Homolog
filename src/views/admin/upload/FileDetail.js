import React from 'react';
import ItalicLabel from "../../../components/ui/ItalicLabel";
import {ByteToM} from "../../../utils/MathUtil";
import {useSelector} from "react-redux";
import {selectUploadItemResc} from "./uploadSlice";
import InputLabel from "../../../components/ui/InputLabel";

function FileDetail(props) {
    const {selectedFileFormat, selectedFile} = useSelector(selectUploadItemResc);

    if (!selectedFile) return <></>;

    return (
        <React.Fragment>
            <ItalicLabel name="大小" value={`${ByteToM(selectedFile.size)}M`}/>
            <ItalicLabel name="格式" value={selectedFile.type}/>
            <InputLabel name="名称*" value={selectedFile.name}/>
            {
                selectedFileFormat==='video' && <ItalicLabel name="时长" value="63:00"/>
            }
            {
                selectedFileFormat==='plugin' && <ItalicLabel name="适用版本" value="Blender2.8+"/>
            }
        </React.Fragment>
    );
}

export default FileDetail;