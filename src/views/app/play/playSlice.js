import {createSlice} from '@reduxjs/toolkit'

export const playSlice = createSlice({
    name: 'player',
    initialState: {
        chapterId: null,
        chapter: null,
    },
    reducers: {
        setChapterId: (state, action) => {
            return {
                ...state,
                chapterId:action.payload,
            }
        },

        setChapter: (state, action) => {
            return {
                ...state,
                chapter:action.payload,
            }
        },
    }
})

export const {setChapterId, setChapter} = playSlice.actions

export const selectPlayer = state => state.player

export default playSlice.reducer