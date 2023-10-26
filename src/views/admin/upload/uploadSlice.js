import {createSlice} from '@reduxjs/toolkit'

export const uploadSlice = createSlice({
    name: 'uploadItemResc',
    initialState: {
        item: null,
        itemID: null,
    },
    reducers: {

        setItem: (state, action) => {
            return {
                ...state,
                item: action.payload,
            }
        },

        setItemID: (state, action) => {
            return {
                ...state,
                itemID: action.payload,
            }
        },

    }
})

export const {setRescType, setItemID, setItem} = uploadSlice.actions
export const selectUploadItemResc = state => state.uploadItemResc

export default uploadSlice.reducer