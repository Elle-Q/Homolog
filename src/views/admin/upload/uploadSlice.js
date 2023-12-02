import {createSlice} from '@reduxjs/toolkit'

export const uploadSlice = createSlice({
    name: 'uploadItemResc',
    initialState: {
        item: null,
        itemID: null,
        refesh: false,
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

        setRefesh: (state, action) => {
            return {
                ...state,
                refesh: action.payload,
            }
        },

    }
})

export const {setRescType, setItemID,setRefesh, setItem} = uploadSlice.actions
export const selectUploadItemResc = state => state.uploadItemResc

export default uploadSlice.reducer