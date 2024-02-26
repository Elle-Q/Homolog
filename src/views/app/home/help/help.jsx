import React, {useState} from 'react';
import {Fab} from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Box from "@mui/material/Box";
import './help.scss'

function Help() {

    const [openModal, setOpenModal] = useState(true)
    const handleHelp = () => {
        toggoleOpenModal()
    }

    const toggoleOpenModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <React.Fragment>
            <Fab className="help-fab" onClick={handleHelp}>
                <ChatBubbleIcon fontSize={'large'} className="help-icon"/>
            </Fab>
            <Box hidden={openModal} className="help-container">

            </Box>
        </React.Fragment>
    );
}

export default Help;