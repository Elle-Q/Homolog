import React from 'react';
import {getColorFromUserStatus} from "../../utils/ToolUtil";
import Avatar from "@mui/material/Avatar";
import {CustomBadge} from "../ui/CustomBadge";

function AvatarBadge(props) {

    const {user, size, handleMouseOver} = props
    return (
        <CustomBadge
            onMouseOver={handleMouseOver}
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            variant="dot"
            sx={{
                '& .MuiBadge-badge': {
                    borderRadius: '50%',
                    backgroundColor: user && getColorFromUserStatus(user.status),
                    color: user && getColorFromUserStatus(user.status),
                },
                '&:hover': {
                    cursor: 'pointer'
                }
            }}
        >
            <Avatar alt="avatar" src={user && user.avatar}
                    sx={{width: `${size.width*10}px`, height: `${size.height*10}px`}}/>
        </CustomBadge>
    );
}

export default AvatarBadge;