import {createSlice} from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        keyword: "",
        metric: "",
        catId: 0,
        doSearch: false
    },
    reducers: {
        setKeyword: (state, action) => {
            return {
                ...state,
                keyword: action.payload,
            }
        },
        setCatId: (state, action) => {
            return {
                ...state,
                catId: action.payload,
            }
        },
        setMetric: (state, action) => {
            return {
                ...state,
                metric: action.payload,
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

export const {setKeyword, setCatId, setMetric, toggleSearch} = searchSlice.actions

export const selectSearch = state => state.search

export default searchSlice.reducer