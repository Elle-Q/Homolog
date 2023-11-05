import {createSlice} from '@reduxjs/toolkit'

export const itemSlice = createSlice({
    name: 'itemModal',
    initialState: {
        openDrawer: false,
        item: {},
    },
    reducers: {
        close: state => {
            return {
                ...state,
                openDrawer: false
            }
        },
        open: (state, action) => {
            return {
                ...state,
                openDrawer: true,
            }
        },
        setItem: (state, action) => {
            return {
                ...state,
                item: action.payload
            }
        },
    }
})

export const {close, open,setItem} = itemSlice.actions
export const selectItemModal = state => state.itemModal

export default itemSlice.reducer