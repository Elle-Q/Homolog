import React from 'react';
import {alpha, styled} from '@mui/material/styles';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {CancelButton, SaveButton} from "./CustomButton";

const ModalDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },

    '& .MuiInputLabel-root': {
        fontSize: '14px',
        color: alpha('#3399ff', 0.5)
    },
    '& .MuiInput-root:before': {
        borderBottom: '1px solid #252422'
    },
}));

const ModalDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};



function Modal(props) {
    const {title, children, open, handleClose, handleSave, maxWidth} = props;

    return (
        <ModalDialog
            onClose={handleClose}
            aria-labelledby="dialog-title"
            open={open}
            fullWidth={true}
            maxWidth={maxWidth}
        >
            <ModalDialogTitle id="dialog-title" onClose={handleClose}>
                <span style={{color: '#3399ff', fontSize: '18px', marginLeft: '5px', textAlign: "center"}}>{title}</span>
            </ModalDialogTitle>
            <DialogContent sx={{mt: '20px', ml: '20px'}}>
                {children}
            </DialogContent>
            <DialogActions sx={{justifyContent: "center", mt: '30px'}}>
                <SaveButton handleClick={handleSave}/>
                <CancelButton handleClick={handleClose}/>
            </DialogActions>
        </ModalDialog>
    );
}

export default Modal;