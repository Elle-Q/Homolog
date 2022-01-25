import React, {useEffect, useState} from 'react';
import {CatStatus} from "../../../common/constant/constant";
import {ImagInputWithHeader, InputWithHeader, SelectInputWithHeader} from "../../../common/custom-input";
import Modal from "../../../common/modal";
import {selectItemModal, close} from "./item-slice";
import {useSelector, useDispatch} from 'react-redux'
import {openAlert} from "../../../features/alert/alertSlice";
import {upload} from "../../../api/qiniu.service";
import {ListCatName, UpdateCat} from "../../../api/cat.service";
import MenuItem from "@mui/material/MenuItem";
import {UpdateItem} from "../../../api/item.service";


function ItemModal(props) {
    const {openModal, readOnly, data} = useSelector(selectItemModal);
    const dispatch = useDispatch();
    const [detail, setDetail] = React.useState(data);
    const [imgFile, setImgFile] = useState(null);
    const [imgUri, setImgUri] = useState(data.Preview);
    const [catNames, setCatNames] = useState(null);

    useEffect(() => {
        imgFile && setImgUri(URL.createObjectURL(imgFile));
    }, [imgFile])

    useEffect(() => {
        setDetail(data)
        setImgUri(data.Preview)
    }, [data])

    React.useEffect(() => {
        ListCatName().then((data) => {
            setCatNames(data)
        })
    }, [])

    const handleClose = () => {
        dispatch(close())
    }

    const handleInputChange = (event) => {
        debugger
        const name = event.target.name;
        const value = event.target.value;
        if (event.target.type === 'file') {
            setImgFile(event.target.files[0]);
        } else {
            setDetail({
                ...detail,
                [name]: value
            })
        }
    };

    //保存资源信息
    const handleSave = async () => {
        //上传文件到七牛, 获取图片外链
        imgFile && upload(imgFile).then(link => {
            let param = Object.assign({}, detail, {Preview: link})

            debugger
            UpdateItem(param).then(() => {
                handleClose();
            })

            dispatch(openAlert());
            setImgFile(null);
        })


    };

    return (
        <Modal title="新增资源"
               maxWidth="md"
               open={openModal}
               handleClose={() => {
                   setImgUri(null);  //置空, 否则会影响其他modal
                   handleClose()
               }}
               handleSave={handleSave}>
            <div style={{display: "flex"}}>
                <InputWithHeader header="名称"
                                 name="Name"
                                 value={data.Name}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
                <InputWithHeader header="B站链接"
                                 name="BLink"
                                 value={data.BLink}
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
                <InputWithHeader header="作者"
                                 name="Author"
                                 value={data.Author}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
                <InputWithHeader header="价格"
                                 name="Price"
                                 value={data.Price}
                                 disabled={readOnly}
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
                    defaultValue="show"
                    handleChange={handleInputChange}
                    disabled={readOnly}
                    type="enum"
                    items={CatStatus}/>

                <SelectInputWithHeader
                    name="CatId"
                    header="类别"
                    defaultValue={catNames && catNames[0].Title}
                    handleChange={handleInputChange}
                    disabled={readOnly}>
                    {
                        catNames && catNames.map((item, index) => (
                            <MenuItem key={item.ID} value={item.ID}>
                                {item.Title}
                            </MenuItem>
                        ))
                    }
                </SelectInputWithHeader>
            </div>


        </Modal>
    );
}

export default ItemModal;