import React, {useState} from 'react';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import WECHAT from '../../../../assets/icons/wechat.svg';
import DISCORD from '../../../../assets/icons/discord.svg';
import BILIBILI from '../../../../assets/icons/bilibili.svg';
import WEPERSONAL from '../../../../assets/images/wechat_personal.jpg';
import './footer.scss'

function Footer(props) {

    const [weHidden, setWeHidden] = useState(true)

    const toggleWeHidden = () => {
        setWeHidden(!weHidden)
    }

    const handleToBili = () => {
        window.open("https://space.bilibili.com/313143248", '_blank');
    }

    return (
        <div className="footer">
            <Divider sx={{backgroundColor: '#403D39'}}/>
            <div className={'footer__content'}>
                <Stack spacing={2} direction={'row'}>
                    <div>
                        <div>©LEETROLL 2024 All rights reserved.</div>
                        <div>鄂ICP备2023024143号</div>
                    </div>

                    <Divider orientation="vertical" sx={{backgroundColor: '#403D39'}} flexItem/>
                    <div>联系方式:</div>
                    <div className={'footer__icon'} onMouseEnter={toggleWeHidden} onMouseLeave={toggleWeHidden}>
                        <div className={'footer__popup'} hidden={weHidden}>
                            <img alt="wechat_personal" src={WEPERSONAL}/>
                        </div>
                        <img alt="wechat" title="wechat" src={WECHAT}/>
                    </div>

                    <div className={'footer__icon'}>
                        <img alt="discord" title="discord" src={DISCORD}/>
                    </div>

                    <div className={'footer__icon'} onClick={handleToBili}>
                        <img alt="bilibili" title="bilibili" src={BILIBILI}/>
                    </div>
                </Stack>
            </div>
        </div>
    );
}

export {Footer} ;

