import {createSlice} from '@reduxjs/toolkit'

export const catSlice = createSlice({
    name: 'catModal',
    initialState: {
        openModal: false,
        readOnly: true
    },
    reducers: {
        close: state => {
            return {
                ...state,
                openModal: false
            }
        },
        open: (state, action) => {
            return {
                ...state,
                openModal: true,
                readOnly:action.payload
            }
        },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // }
    }
})

export const {close, open} = catSlice.actions
export const selectCatModal = state => state.catModal

export default catSlice.reducer