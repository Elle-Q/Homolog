import {createSlice} from '@reduxjs/toolkit'

export const adminItemSlice = createSlice({
    name: 'adminItemModal',
    initialState: {
        openModal: false,
        readOnly: true,
        data: {},
    },
    reducers: {
        close: state => {
            return {
                ...state,
                openModal: false
            }
        },
        open: (state, action) => {
            const {readOnly, data} = action.payload
            return {
                ...state,
                openModal: true,
                readOnly:readOnly,
                data:data,
            }
        },
    }
})

export const {close, open} = adminItemSlice.actions
export const selectItemModal = state => state.adminItemModal

export default adminItemSlice.reducer