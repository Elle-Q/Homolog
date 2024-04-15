import React from 'react';
import Office from "../../assets/icons/office.png";
import "./agenda.scss"

function Agenda(props) {
    return (
        <div className="community__header-box">
            <div className="community__header-heading-box--left">
                <img src={Office}/>
                <h1>我有工具<br/>你有创意</h1>
            </div>
            <div className="community__header-heading-box--right">
                <h2 className="community__header-heading-h2">视频教程翻译</h2>
                <p>leetroll字幕组人工精翻 涵盖blender maya zBrush hudini UE 3dMax等主流3d软件</p>
            </div>
            <div className="community__header-heading-box--right">
                <h2 className="community__header-heading-h2">3D资源下载</h2>
                <p>30w+ 3d资源下载<br/> 模型 4k贴图 hdri 合集</p>
            </div>
        </div>
    );
}

export default Agenda;