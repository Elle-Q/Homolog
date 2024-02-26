import {createSlice} from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        refresh: false,
    },
    reducers: {
        setRefresh: state => {
            return {
                ...state,
                refresh: !state.refresh
            }
        },

    }
})

export const {setRefresh} = orderSlice.actions
export const selectOrder = state => state.order

export default orderSlice.reducer