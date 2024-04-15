import React from 'react';
import {alpha} from "@mui/material/styles";
import Button from "@mui/material/Button";

function ColorButton(props) {
    const {handleClick, color} = props;
    return (
        <Button className="btn"
                sx={{
                    color: `${color} !important`,
                    backgroundColor: alpha(`${color}`, 0.2),
                    '&:hover': {
                        backgroundColor: alpha(`${color}`, 0.4),
                    }
                }}
                onClick={handleClick}
        >
            {props.children}
        </Button>
    );
}

export default ColorButton;