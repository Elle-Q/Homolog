import React from 'react';
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

function IconInput(props, ref) {
    const {onChange, placeholder, icon, type, value} = props;

    return (
        <div className="login__input-box">
            <IconButton className="login__input-box__icon">
                {icon}
            </IconButton>
            <Input
                className="login__input-box__input"
                type={type === 'password' ? 'password' : 'text'}
                disableUnderline={true}
                onChange={onChange}
                placeholder={placeholder}
                inputRef={ref}
                value={value}
            />
            {props.children}
        </div>
    );
}

export default React.forwardRef(IconInput)