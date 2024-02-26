import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectConfirm, setOpen} from "./confirmSlice";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {CancelButton, OKButton} from "../../ui/CustomButton";

function AlertDialog(props) {
    const {open, okHandle} = useSelector(selectConfirm);
    const dispatch = useDispatch();
    const {title, note} = props;


    const handleOKCloseInner = () => {
        okHandle();
        dispatch(setOpen({open:false}))
    }

    const handleClose = () => {
        dispatch(setOpen({open:false}))
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {note}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <CancelButton handleClick={handleClose}>取消</CancelButton>
                <OKButton handleClick={handleOKCloseInner} autoFocus>
                    确定
                </OKButton>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;