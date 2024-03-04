import React from 'react';
import PayBg from "../../../../assets/bg/pay_bg_01.jpg";
import {QRCodeSVG} from "qrcode.react";
import Dialog from "@mui/material/Dialog";
import QrcodeImg from "../../../../assets/logo/logo.png";

let imageSettings = {
    src: QrcodeImg,
    height: 30,
    width: 34,
    excavate: true,
}

function Qrcode(props) {

    const {uri, open, handleClose} = props

    return (
        <Dialog open={open}
                onClose={handleClose}>

            <div style={{borderRadius: '20px', display: 'flex'}}>
                <img alt="paybg" src={PayBg} style={{width: '256px', borderRadius: ' 20px 0 0 20px'}}/>
                <div style={{backgroundColor: 'black', borderRadius: '0 20px 20px 0'}}>
                    <p style={{
                        fontSize: '14px',
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}>收款方：滚石网络科技</p>
                    <QRCodeSVG
                        value={uri}
                        size={256}
                        bgColor='transparent'
                        fgColor='#fff'
                        includeMargin={false}
                        level={"L"}
                        imageSettings={imageSettings}
                        style={{padding: '0 15px'}}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default Qrcode;