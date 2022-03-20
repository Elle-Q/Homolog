import {createSlice} from '@reduxjs/toolkit'

export const playSlice = createSlice({
    name: 'player',
    initialState: {
        itemId: null,
        item: null,
    },
    reducers: {
        setItemId: (state, action) => {
            return {
                ...state,
                itemId:action.payload,
            }
        },

        setItem: (state, action) => {
            return {
                ...state,
                item:action.payload,
            }
        },
    }
})

export const {setItemId, setItem} = playSlice.actions

export const selectPlayer = state => state.player

export default playSlice.reducer