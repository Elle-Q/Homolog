import React, {useEffect, useRef, useState} from 'react';
import {getInternalSeconsFromNow} from "../../utils/DateUtil";

function Countdown({expire, date, onComplete}) {
    const [timeView, setTimeView] = useState({});
    const timerRef = useRef(null);

    useEffect(() => {
        if (date) {
            countDown();
        } else {
            setTimeView({ h: '00', m: '00', s: '00' });
        }
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [date]);

    const countDown = () => {
        let times = expire - getInternalSeconsFromNow(date);
        const h = parseInt(`${(times / 60 / 60) % 24}`);
        const m = parseInt(`${(times / 60) % 60}`);
        const s = parseInt(`${times % 60}`);

        setTimeView({
            h: h < 10 ? `0${h}` : `${h}`,
            m: m < 10 ? `0${m}` : `${m}`,
            s: s < 10 ? `0${s}` : `${s}`,
        });

        if (times <= 0) {
            clearTimeout(timerRef.current);
            setTimeView({ h: '00', m: '00', s: '00' });
        } else {
            timerRef.current = setTimeout(() => {
                countDown();
            }, 1000);
        }
    }

    return (
        <span>{timeView?.h}:{timeView?.m}:{timeView?.s}</span>
    );
}

export default Countdown;