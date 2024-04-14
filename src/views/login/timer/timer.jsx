import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";

function Timer(props) {
    const {handleClickSend} = props
    const [timer, setTimer] = useState(60);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (!start) return;
        if (timer < 1) {
            setTimer(0);
            setStart(false);
        }
        setTimeout(() => {
            setTimer(timer - 1)
        }, 1000);
    }, [timer, start])

    const SendMSCode = () => {
        if (start) return
        setStart(true)
        setTimer(60)
        handleClickSend()
    }

    return (
        <button className="login__btn--varify"
                onClick={SendMSCode}>
            发送验证码 {start && timer}
        </button>
    );
}

export default Timer;