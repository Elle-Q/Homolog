import React, {createRef, useEffect, useState} from 'react';
import {CatStatus} from "../../../utils/constant/constant";
import {ImagInputWithHeader, InputWithHeader, SelectInputWithHeader} from "../../../components/ui/CustomInput";
import Modal from "../../../components/Modal";
import api from "../../../api/api";
import {selectCatModal, close} from "./catSlice";
import {useSelector, useDispatch} from 'react-redux'
import {openAlert} from "../../../components/alert/ops/alertSlice";
import {upload} from "../../../api/qiniu.service";
import {UpdateCat} from "../../../api/cat.service";
import {setRefresh} from "../../../app/refreshSlice";
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "react-hook-form";


function CatModal(props) {
    const {openModal, readOnly, data, type} = useSelector(selectCatModal);
    const dispatch = useDispatch();
    const [detail, setDetail] = React.useState(data);
    const [preFile, setPreFile] = useState(null);
    const [pageImgFile, setPageImgFile] = useState(null);
    const [imgUri, setImgUri] = useState(data.Preview);
    const [pageImgUri, setPageImgUri] = useState(data.PageImg);

    useEffect(() => {
        preFile && setImgUri(URL.createObjectURL(preFile));
    }, [preFile])

    useEffect(() => {
        pageImgFile && setPageImgUri(URL.createObjectURL(pageImgFile));
    }, [pageImgFile])

    useEffect(() => {
        setDetail(data)
        setImgUri(data.Preview)
        setPageImgUri(data.PageImg)
    }, [data])

    const handleClose = () => {
        dispatch(close());
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (event.target.type === 'file') {
            if (name === 'Preview') {
                setPreFile(event.target.files[0]);
            } else {
                setPageImgFile(event.target.files[0]);
            }
        } else {
            setDetail({
                ...detail,
                [name]: value
            })
        }
    };

    //保存分类信息
    const handleSave = async () => {
        let param = Object.assign({}, detail, {});
        if (!detail.Status) param.Status = "show"

        //上传文件到七牛, 获取图片外链
        preFile && await upload(preFile).then(link =>  param.Preview = link );
        pageImgFile && await upload(pageImgFile).then(link => param.PageImg = link);

        await UpdateCat(param).then(() => {
            handleClose();
            dispatch(setRefresh())
            dispatch(openAlert());
            setPreFile(null);
        })
    };

    return (
        <Modal title={type === "add" ? "新增分类" : (type === "show" ? "展示分类" : "编辑分类")}
               maxWidth="md"
               open={openModal}
               handleClose={() => {
                   setImgUri(null);  //置空, 否则会影响其他modal
                   handleClose()
               }}
               handleSave={handleSave}>
            <div style={{display: "flex"}}>
                <InputWithHeader header="标题"
                                 name="Title"
                                 value={data.Title}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
                <InputWithHeader header="副标题"
                                 name="SubTitle"
                                 value={data.SubTitle}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <ImagInputWithHeader
                    header="预览图"
                    name="Preview"
                    img={imgUri}
                    onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <ImagInputWithHeader
                    header="主图"
                    name="PageImg"
                    img={pageImgUri}
                    onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <InputWithHeader fullWidth={false}
                                 multiline={true}
                                 name="Desc"
                                 header="描述"
                                 value={data.Desc}
                                 placeholder="描述一下分类"
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <SelectInputWithHeader
                    name="Status"
                    header="状态"
                    value={detail.Status || "show"}
                    handleChange={handleInputChange}
                    disabled={readOnly}
                    type="enum"
                    items={CatStatus}/>
            </div>

        </Modal>
    );
}

export default CatModal;