import React from 'react';
import {QRCodeSVG} from "qrcode.react";
import QrcodeImg from "../../../assets/logo/logo.png";

let imageSettings = {
    src: QrcodeImg,
    height: 30,
    width: 34,
    excavate: true,
}

function Qrcode(props) {

    const {uri} = props

    return (
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
    );
}

export default Qrcode;