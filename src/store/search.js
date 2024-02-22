import {createSlice} from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        keyword: "",
        doSearch: false
    },
    reducers: {
        setKeyword: (state, action) => {
            return {
                ...state,
                keyword: action.payload,
            }
        },
        toggleSearch: (state, action) => {
            return {
                ...state,
                doSearch: !state.doSearch,
            }
        },
    }
})

export const {setKeyword,toggleSearch} = searchSlice.actions

export const selectSearch = state => state.search

export default searchSlice.reducer