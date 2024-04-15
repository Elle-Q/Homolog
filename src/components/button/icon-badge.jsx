import React from 'react';
import IconButton from "@mui/material/IconButton";
import "./button.scss"

function IconBadge({cnt, handleClick, icon}) {
    return (
        <IconButton className="icon-badge__icon-box" onClick={handleClick}>
            {icon}
            {
                cnt > 0 &&
                <div className="icon-badge__badge">{cnt}</div>
            }
        </IconButton>
    );
}

export default IconBadge;