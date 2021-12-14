import React, {useEffect, useState} from 'react';
import {CatStatus} from "../../../common/constant/constant";
import {ImagInputWithHeader, InputWithHeader, SelectInputWithHeader} from "../../../common/CustomInput";
import Modal from "../../../common/Modal";
import axios from "axios";
import {selectCatModal, close} from "./catSlice";
import { useSelector, useDispatch } from 'react-redux'
import {open} from "../../alert/alertSlice";


function CatModal(props) {
    const {openModal, readOnly} = useSelector(selectCatModal);
    const dispatch = useDispatch();
    const {data} = props;
    const [detail, setDetail] = React.useState(data);
    const [imgFile, setImgFile] = useState(null);
    const [imgUri, setImgUri] = useState(data.Preview);

    useEffect(() => {
        imgFile && setImgUri(URL.createObjectURL(imgFile));
    },[imgFile])


    const handleClose = () => {
        dispatch(close())
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (event.target.type === 'file') {
            setImgFile(event.target.files[0]);
        } else {
            setDetail({
                ...detail,
                [name]:value
            })
        }
    };

    const handleSave = async () => {
        const data = new FormData();
        imgFile && data.append("Preview", imgFile);
        for (let k in detail ) {
            data.append(k, detail[k]);
        }
        const resp = await axios.post('/homo-admin/cat/update', data);
        dispatch(open())
        resp && handleClose();
        setImgFile(null)
    };

    return (
        <Modal title="新增分类"
               open={openModal}
               handleClose={()=>{
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
                    header="主图"
                    name="Preview"
                    img={imgUri}
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
                    items={CatStatus}/>
            </div>

        </Modal>
    );
}

export default CatModal;