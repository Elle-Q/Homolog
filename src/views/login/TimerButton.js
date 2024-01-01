import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";

function TimerButton(props) {
    const {onClick} = props
    const [timer, setTimer] = useState(10);
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
        setTimer(10)
    }

    return (
        <Button sx={{
            backgroundColor: "transparent",
            color: '#3399ff',
            fontSize: '18px',
            marginLeft: '10px',
            width: '150px'
        }}
                onClick={SendMSCode}>
            发送验证码 {start && timer}
        </Button>
    );
}

export default TimerButton;