import React, {useEffect, useState} from 'react';
import {Modal} from "../modal/modal";
import {Checkbox} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Markdown from 'react-markdown'
import {getAgreement} from "../../api/config.service";
import './agreement.scss'

function Agreement(props) {
    const {handleAgree, agree, type, label} = props
    const [openAgreement, setOpenAgreement] = useState(false)
    const [agreement, setAgreement] = useState("")

    useEffect(() => {
        //获取协议内容
        getAgreement(type).then(resp => {
            setAgreement(resp)
        })
    }, [type]);

    const toggleOpenAgr = () => {
        setOpenAgreement(!openAgreement)
    }

    const handleOK = () => {
        handleAgree();
        toggleOpenAgr()
    }

    return (
        <React.Fragment>
            <div className="agreement">
                <Checkbox
                    className="agreement__checkbox"
                    checked={agree}
                    onChange={handleAgree}
                    size="small"
                />
                <span>{label}</span>
                <HelpOutlineIcon className="agreement__icon" onClick={toggleOpenAgr}/>
            </div>
            <Modal title="leetroll用户登录注册协议"
                   maxWidth="md"
                   open={openAgreement}
                   handleClose={toggleOpenAgr}
                   handleOK={handleOK}>
                <Markdown children={agreement} className={'agreement'}/>
            </Modal>
        </React.Fragment>
    );
}

export default Agreement;