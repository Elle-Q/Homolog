import React, {useEffect, useRef, useState} from 'react';
import {CatStatus} from "../../../utils/constant/constant";
import {ImagInputWithHeader, InputWithHeader, SelectInputWithHeader} from "../../../components/ui/CustomInput";
import Modal from "../../../components/Modal";
import {selectItemModal, close} from "./item-slice";
import {useSelector, useDispatch} from 'react-redux'
import {openAlert} from "../../../components/alert/alertSlice";
import {upload} from "../../../api/qiniu.service";
import {ListCatName} from "../../../api/cat.service";
import MenuItem from "@mui/material/MenuItem";
import {UpdateItem} from "../../../api/item.service";
import AddIcon from '@mui/icons-material/Add';
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import {Input} from "@mui/material";

function ItemModal(props) {
    const {openModal, readOnly, data} = useSelector(selectItemModal);
    const dispatch = useDispatch();
    const [detail, setDetail] = React.useState(data);
    const [imgFile, setImgFile] = useState(null);
    const [imgUri, setImgUri] = useState(data.Preview);
    const [catNames, setCatNames] = useState(null);
    const [tags, setTags] = useState([]); //todo: 设计键
    const [showTagInput, setShowTagInput] = useState(false);
    const tagRef = useRef();

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

        const save = (param) => {
            UpdateItem(param).then(() => {
                handleClose();
                dispatch(openAlert());
                setImgFile(null);
            })
        }
        //上传文件到七牛, 获取图片外链
        if (imgFile) {
            imgFile && upload(imgFile).then(link => {
                let param = Object.assign({}, detail,
                    {
                        Preview: link,
                        Tags: tags.toString()
                    });
                save(param);
            })
        } else {
            let param = Object.assign({}, detail, { Tags: tags.toString()})
            save(param);
        }
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
                <InputWithHeader header="名称:"
                                 name="Name"
                                 value={data.Name}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
                <InputWithHeader header="B站链接:"
                                 name="BLink"
                                 value={data.BLink}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <ImagInputWithHeader
                    header="预览图:"
                    name="Preview"
                    img={imgUri}
                    onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <InputWithHeader header="作者:"
                                 name="Author"
                                 value={data.Author}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
                <InputWithHeader header="价格:"
                                 name="Price"
                                 value={data.Price}
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <InputWithHeader fullWidth={false}
                                 multiline={true}
                                 name="Desc"
                                 header="描述:"
                                 value={data.Desc}
                                 placeholder="描述一下内容"
                                 disabled={readOnly}
                                 onChange={handleInputChange}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <SelectInputWithHeader
                    name="Status"
                    header="状态:"
                    defaultValue="show"
                    handleChange={handleInputChange}
                    disabled={readOnly}
                    type="enum"
                    items={CatStatus}/>

                <SelectInputWithHeader
                    name="CatId"
                    header="类别:"
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
            <div style={{display: "flex", marginTop: '30px'}}>
                <span style={{marginRight: '15px', verticalAlign: "bottom"}}>标签:</span>
                {
                    tags && tags.map((key, index) => {
                        return <React.Fragment>
                            <Chip
                                sx={{
                                    // color: 'text.secondary',
                                    mr: "15px",
                                    boxShadow: '0 0 2px #CCC5B9',
                                    '& > .MuiChip-deleteIcon:hover': {
                                        color: 'red',
                                    }
                                }}
                                label={key}
                                key={index}
                                onDelete={() => {
                                    setTags(tags.filter(t => t !== key))
                                }}
                            />
                        </React.Fragment>
                    })
                }
                {
                    showTagInput === true &&
                    <Input
                        inputRef={tagRef}
                        placeholder="输入标签"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setTags([...tags, tagRef.current.value])
                                setShowTagInput(false)
                            }
                        }}
                        sx={{
                            fontStyle: 'italic',
                            fontSize: '12px',
                            width: '70px',
                            pl: '10px'
                        }}/>

                }
                <IconButton onClick={() => {
                    setShowTagInput(true)
                }}>
                    <AddIcon fontSize='small' sx={{color: '#3399ff'}}/>
                </IconButton>
            </div>
        </Modal>
    );
}

export default ItemModal;

