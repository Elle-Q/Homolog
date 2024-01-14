import React from 'react';
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/system";

function InputWithIcon(props, ref) {
    const {onChange, placeholder, icon, type} = props
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
                type={type === 'password' ? 'password' : 'text'}
                disableUnderline={true}
                onChange={onChange}
                placeholder={placeholder}
                inputRef={ref}
                sx={{
                    color:'#dcddde',
                    marginLeft: '5px',
                    paddingLeft: '5px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontFamily: '-apple-system',
                    width: `${type === 'verify' ? 300 : 450}px`,
                    backgroundColor: alpha('#000', 1),
                    height: `50px`,
                    '&:hover': {
                        border: '1px solid #5C60FD9E'
                    }
                }}
            />

            {props.children}
        </div>
    );
}

export default React.forwardRef(InputWithIcon)