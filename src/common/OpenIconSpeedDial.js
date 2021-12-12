import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import {alpha} from "@mui/system";

export default function OpenIconSpeedDial(actions) {

    return (
        <SpeedDial
            direction="down"
            ariaLabel="SpeedDial openIcon example"
            sx={{
                position: 'fixed',
                top: '25%',
                right: '1%',
                zIndex: 11,
            }}
            FabProps={{
                style: {width: 60, height: 60},
                sx: {
                    "&.MuiSpeedDial-fab:hover": {
                        border: "none"
                    },
                    backgroundColor: alpha('#252422', 0.5)
                }
            }
            }
            icon={<SpeedDialIcon
                icon={<AddIcon sx={{color:'#0aa858'}}/>}
                openIcon={<TipsAndUpdatesIcon sx={{color:'#0aa858'}}/>}/>}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    sx={{color:'#0aa858'}}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                />
            ))}
        </SpeedDial>
    );
}