import React, {useEffect, useState} from 'react';
import {Modal} from "../../../components/Modal";
import {Checkbox} from "@mui/material";
import {pink} from "@mui/material/colors";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Markdown from 'react-markdown'
import {getAgreement} from "../../../api/config.service";
import './agreement.scss'
import {fontSize} from "@mui/system";

function Agreement(props) {
    const {handleAgree, agree, type, label} = props
    const [openAgreement, setOpenAgreement] = useState(false)
    const [agreement, setAgreement] = useState("")

    useEffect(() => {
        //获取协议内容
        getAgreement(type).then(resp => {
            setAgreement(resp)
        })
    }, []);

    const toggleOpenAgr = () => {
        setOpenAgreement(!openAgreement)
    }

    const handleOK = () => {
        handleAgree();
        toggleOpenAgr()
    }

    return (
        <React.Fragment>
            <div style={{color: '#6e6d6d', fontSize: "14px", display: 'flex', alignItems: 'center'}}>
                <Checkbox
                    checked={agree}
                    onChange={handleAgree}
                    size="small"
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                />
                <span style={{fontSize:'12px'}}>{label}</span>
                <HelpOutlineIcon sx={{
                    width: '14px',
                    verticalAlign: 'top',
                    '&:hover': {
                        color: '#8ecae6'
                    }
                }} onClick={toggleOpenAgr}/>
            </div>
            <Modal title="leetroll用户登录注册协议"
                   maxWidth="sm"
                   open={openAgreement}
                   handleClose={toggleOpenAgr}
                   handleOK={handleOK}>
                <Markdown children={agreement} className={'agreement'}/>
            </Modal>
        </React.Fragment>
    );
}

export default Agreement;