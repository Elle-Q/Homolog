import React from 'react';
import Box from "@mui/material/Box";
import ItalicLabel from "../../../components/ui/ItalicLabel";
import {ByteToM} from "../../../utils/MathUtil";
import {useSelector} from "react-redux";
import {selectCatModal} from "../category/catSlice";
import {selectUploadItemResc} from "./uploadSlice";
import InputLabel from "../../../components/ui/InputLabel";

function FileDetail(props) {
    const {file} = props;
    const {selectedFileFormat} = useSelector(selectUploadItemResc);

    console.log(selectedFileFormat)
    return (
        <React.Fragment>
            <ItalicLabel name="大小" value={`${ByteToM(file[0].size)}M`}/>
            <ItalicLabel name="格式" value={file[0].format}/>
            <InputLabel name="名称*" value={file[0].name}/>
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