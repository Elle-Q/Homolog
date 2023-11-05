import {createSlice} from '@reduxjs/toolkit'

export const playSlice = createSlice({
    name: 'player',
    initialState: {
        chapterId: null,
        chapters: null,
    },
    reducers: {
        setChapterId: (state, action) => {
            return {
                ...state,
                chapterId:action.payload,
            }
        },

        setChapters: (state, action) => {
            return {
                ...state,
                chapters:action.payload,
            }
        },
    }
})

export const {setChapterId, setChapters} = playSlice.actions

export const selectPlayer = state => state.player

export default playSlice.reducer