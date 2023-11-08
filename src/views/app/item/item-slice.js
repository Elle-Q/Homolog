import {createSlice} from '@reduxjs/toolkit'

export const itemSlice = createSlice({
    name: 'itemModal',
    initialState: {
        item: {},
    },
    reducers: {
        setItem: (state, action) => {
            return {
                ...state,
                item: action.payload
            }
        },
    }
})

export const {setItem} = itemSlice.actions
export const selectItemModal = state => state.itemModal

export default itemSlice.reducer