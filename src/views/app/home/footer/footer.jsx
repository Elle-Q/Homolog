import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import WECHAT from '../../../../assets/icons/wechat.svg';
import DISCORD from '../../../../assets/icons/discord.svg';
import BILIBILI from '../../../../assets/icons/bilibili.svg';
import WEGROUP from '../../../../assets/images/wechat_group_official.jpg';
import './footer.scss'

function Footer(props) {

    const [weHidden, setWeHidden] = useState(true)

    const toggleWeHidden = () => {
        setWeHidden(!weHidden)
    }

    return (
        <Box sx={{
            boxShadow: "none",
            position: 'relative',
            width: '100%',
            bottom: 0,
            left: 0,
            backgroundColor: "transparent",
            marginTop: '30px'
        }}>
            <Divider sx={{backgroundColor: '#403D39'}}/>
            <div className={'footer-container'}>
                <Stack spacing={2} direction={'row'}>
                    <div>
                        <div>©LEETROLL 2024 All rights reserved.</div>
                        <div>鄂ICP备2023024143号</div>
                    </div>

                    <Divider orientation="vertical" sx={{backgroundColor: '#403D39'}} flexItem />
                    <div>联系方式:</div>
                    <div className={'footer-icon'} onMouseEnter={toggleWeHidden} onMouseLeave={toggleWeHidden}>
                        <div className={'footer-pop'} hidden={weHidden}>
                            <img alt="wechat_group" src={WEGROUP}/>
                        </div>
                        <img alt="wechat" title="wechat" src={WECHAT}/>
                    </div>

                    <div className={'footer-icon'}>
                        <img alt="discord" title="discord" src={DISCORD}/>
                    </div>

                    <div className={'footer-icon'}>
                        <img alt="bilibili" title="bilibili" src={BILIBILI}/>
                    </div>
                </Stack>
            </div>
        </Box>
    );
}

export {Footer} ;

