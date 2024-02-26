import React from 'react';
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDial from "@mui/material/SpeedDial";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";

function PageTipFloatingBar(props) {

    const actions = [
        {icon: <ContentCopyIcon/>, name: '复制链接'},
        {icon: <ShoppingCartIcon/>, name: '购买'},
        {icon: <BookmarkBorderIcon/>, name: '收藏'},
        {icon: <ShareIcon/>, name: '分享'},
    ];

    return (
        <SpeedDial
            direction="down"
            ariaLabel="SpeedDial tips"
            sx={{
                position: 'fixed',
                top: '25%',
                left: '5%',
                zIndex: 11,
            }}
            FabProps={{
                style: {width: 60, height: 60},
                sx: {
                    "&.MuiSpeedDial-fab": {
                        backgroundColor: "transparent",
                        boxShadow: "none"
                    },
                    "&.MuiSpeedDial-fab:hover": {
                        backgroundColor: '#132F4C',
                        boxShadow: '0 0 50px #173A5E',
                    }
                }
            }
            }
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    title={action.name}
                />
            ))}
        </SpeedDial>
    );
}

export default PageTipFloatingBar;