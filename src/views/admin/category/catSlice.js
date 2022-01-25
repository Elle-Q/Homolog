import {createSlice} from '@reduxjs/toolkit'

export const catSlice = createSlice({
    name: 'catModal',
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

export const {close, open} = catSlice.actions
export const selectCatModal = state => state.catModal

export default catSlice.reducer