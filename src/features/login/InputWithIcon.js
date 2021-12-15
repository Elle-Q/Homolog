import React, {useEffect, useState} from 'react';
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {alpha} from "@mui/system";

function InputWithIcon(props) {
    const {onChange, placeholder, icon, type} = props
    const [timer, setTimer] = useState(10);
    const [start, setStart] = useState(false);

    console.log("ss")
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

    const makeTimer = () => {
        if (start) return
        setStart(true)
        setTimer(10)
    }

    return (
        <div style={{
            marginTop: '30px',
            textAlign: "bottom",
            display: 'flex',
            alignItems: 'center'
        }}>
            <IconButton
                sx={{
                    color: '#3399ff',
                }}>
                {icon}

            </IconButton>

            <Input
                disableUnderline={true}
                onChange={onChange}
                placeholder={placeholder}
                // disabled={disabled}
                sx={{
                    marginLeft: '5px',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontFamily: '-apple-system',
                    width: `${type === 'verify' ? 300 : 400}px`,
                    backgroundColor: alpha('#0a0908', 0.2),
                    height: `40px`,
                    border: '1px solid #173A5E',
                    '&:hover': {
                        border: '1px solid #3399ff'
                    }
                }}
            />
            {
                type === 'verify' &&
                <Button sx={{
                    backgroundColor: "transparent",
                    color: '#3399ff',
                    fontSize: '14px',
                    marginLeft: '10px',
                }}
                        onClick={makeTimer}
                >发送验证码
                    {start && timer}</Button>
            }

        </div>
    );
}

export default InputWithIcon;