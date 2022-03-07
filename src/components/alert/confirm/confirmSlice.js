import {createSlice} from '@reduxjs/toolkit'

export const confirmSlice = createSlice({
    name: 'confirm',
    initialState: {
        open: false,
        okHandle:{}
    },
    reducers: {
        setOpen: (state, action) => {
           const {open, okHandle} = action.payload
            return {
                ...state,
                open:open,
                okHandle:okHandle
            }
        },
    }
})

export const {setOpen} = confirmSlice.actions

export const selectConfirm = state => state.confirm

export default confirmSlice.reducer