import {createSlice} from '@reduxjs/toolkit'

export const itemSlice = createSlice({
    name: 'itemModal',
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

export const {close, open} = itemSlice.actions
export const selectItemModal = state => state.itemModal

export default itemSlice.reducer