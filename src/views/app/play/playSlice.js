import {createSlice} from '@reduxjs/toolkit'

export const playerSlice = createSlice({
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

export const {setItemId} = playerSlice.actions

export const selectPlayer = state => state.player

export default playerSlice.reducer