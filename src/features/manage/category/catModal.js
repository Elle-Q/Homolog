import React from 'react';
import {CatStatus} from "../../../common/constant/constant";
import preview from '../../../assets/duck_1.jpg.png'
import {ImagInputWithHeader, InputWithHeader, SelectInputWithHeader} from "../../../common/CustomInput";
import Modal from "../../../common/Modal";


function CatModal(props) {
    const {open, handleClose, readyOnly, data} = props;
    const [currency, setCurrency] = React.useState('show');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <Modal title="新增分类" open={open} handleClose={handleClose}>
            <div style={{display: "flex"}}>
                <InputWithHeader header="标题" value={data.Title} disabled={readyOnly} onChange={() => {}}/>
                <InputWithHeader header="副标题" value={data.SubTitle} disabled={readyOnly} onChange={() => {}}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <ImagInputWithHeader header="主图" img={preview}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <InputWithHeader fullWidth={false}
                                 multiline={true}
                                 header="描述"
                                 value={data.Desc}
                                 placeholder="描述一下分类"
                                 disabled={readyOnly}
                                 onChange={() => {
                                 }}/>
            </div>

            <div style={{display: "flex", marginTop: '30px'}}>
                <SelectInputWithHeader
                    header="状态"
                    handleChange={handleChange}
                    value={data.Status}
                    disabled={readyOnly}
                    items={CatStatus}/>
            </div>

        </Modal>
    );
}

export default CatModal;