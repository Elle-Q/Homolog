import React from 'react';
import {alpha} from "@mui/material/styles";
import {default as InfoModal} from "./Modal";
import {Drawer} from "@mui/material";

function UserDrawer(props) {
    const {user, toggleDrawer, open} = props;

    return (
        <Drawer
            PaperProps={{
                sx: {
                    backgroundColor: alpha('#252422', 0.9),
                }
            }}
            open={open}
            onClose={toggleDrawer(false)}
        >
            <InfoModal user={user} toggleDrawer={toggleDrawer}/>
        </Drawer>
    );

}

export default UserDrawer;