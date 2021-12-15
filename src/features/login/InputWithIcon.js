import React, {useEffect, useState} from 'react';
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import {alpha} from "@mui/system";

function InputWithIcon(props) {
    const {onChange, placeholder, icon, type} = props
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
            alignItems: 'center',
        }}>
            <IconButton
                sx={{
                    color: '#dcddde',
                }}>
                {icon}

            </IconButton>

            <Input
                disableUnderline={true}
                onChange={onChange}
                placeholder={placeholder}
                // disabled={disabled}
                sx={{
                    color:'#dcddde',
                    marginLeft: '5px',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontFamily: '-apple-system',
                    width: `${type === 'verify' ? 300 : 450}px`,

                    backgroundColor: alpha('#000', 0.3),
                    height: `50px`,
                    border: '1px solid #000',
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
                    fontSize: '18px',
                    marginLeft: '10px',
                    width:'150px'
                }}
                        onClick={makeTimer}
                >发送验证码
                    {start && timer}</Button>
            }

        </div>
    );
}

export default InputWithIcon;