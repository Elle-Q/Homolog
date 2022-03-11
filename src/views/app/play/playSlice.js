import {createSlice} from '@reduxjs/toolkit'

export const playSlice = createSlice({
    name: 'player',
    initialState: {
        itemId: null,
    },
    reducers: {
        setItemId: (state, action) => {
            return {
                ...state,
                itemId:action.payload,
            }
        },
    }
})

export const {setItemId} = playSlice.actions

export const selectPlayer = state => state.player

export default playSlice.reducer