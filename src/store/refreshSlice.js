import {createSlice} from '@reduxjs/toolkit'

export const refreshSlice = createSlice({
    name: 'refresh',
    initialState: {
        refresh: false,
    },
    reducers: {
        setRefresh: (state) => {
            return {
                ...state,
                refresh:!state.refresh,
            }
        },
    }
})

export const {setRefresh} = refreshSlice.actions

export const selectRefresh = state => state.refresh

export default refreshSlice.reducer