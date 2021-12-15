import {createSlice} from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        status: '',
        openAlert:false,
        msg:''
    },
    reducers: {
        updateMsg: (state, action) => {
            const {status, msg} = action.payload
            return {
                ...state,
                status:status,
                msg:msg,
            }
        },
        openAlert: (state) => {
            return {
                ...state,
                openAlert:true
            }
        },
        close: (state) => {
            return {
                ...state,
                openAlert:false
            }
        },
    }
})

export const {updateMsg, close, openAlert} = alertSlice.actions

export const selectAlert = state => state.alert

export default alertSlice.reducer