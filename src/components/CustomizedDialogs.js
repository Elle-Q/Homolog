import React from 'react';
import Dialog from "@mui/material/Dialog";
import {DialogContent, DialogTitle} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from "prop-types";
import {styled} from '@mui/material/styles';
import Draggable from 'react-draggable';
import Paper from "@mui/material/Paper";

const BootstrapDialog = styled(Dialog)(({theme}) => ({

    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

function CustomizedDialogs(props) {
    const {open, handleClose, title} = props

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <BootstrapDialogTitle id="dialog-title" onClose={handleClose}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent sx={{
                width: '600px',
                height: '380px',
            }} dividers>
                {props.children}
            </DialogContent>
        </BootstrapDialog>
    );
}

export default CustomizedDialogs;