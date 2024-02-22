import React, {useEffect, useRef, useState} from 'react';

function Timer(props) {

    const {expire} = props

    const [countDownTimer, setCountDownTimer] = useState(null);
    const [timeView, setTimeView] = useState(''); // 倒计时显示


    useEffect(() => {
        if (expire) {
            countDown();
        } else {
            setTimeView({ h: '00', m: '00', s: '00' });
        }
        return () => {
            clearTimeout(countDownTimer);
        };
    }, []);

    const countDown = () => {
        const nowTime = +new Date();
        const times = parseInt(`${(expire - nowTime) / 1000}`);
        const h = parseInt(`${(times / 60 / 60) % 24}`);
        const m = parseInt(`${(times / 60) % 60}`);
        const s = parseInt(`${times % 60}`);

        setTimeView({
            h: h < 10 ? `0${h}` : `${h}`,
            m: m < 10 ? `0${m}` : `${m}`,
            s: s < 10 ? `0${s}` : `${s}`,
        });

        //时间判断
        if (times <= 0) {
            clearTimeout(countDownTimer);
            setTimeView({ h: '00', m: '00', s: '00' });
        } else {
            const timeId = setTimeout(() => {
                countDown();
            }, 1000);
            setCountDownTimer(timeId)
        }
    };

    return (
        <>
            {timeView?.h}:{timeView?.m}:{timeView?.s}
        </>
    );
}

export default Timer;