import {createSlice} from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: 'loadingModel',
    initialState: {
        loading: true,
    },
    reducers: {
        setLoading:  (state, action) => {
            return {
                ...state,
                loading:action.payload,
            }
        },
    }
})

export const {setLoading} = loadingSlice.actions
export const selectLoadingModal = state => state.loadingModel

export default loadingSlice.reducer