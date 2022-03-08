import {createSlice} from '@reduxjs/toolkit'

export const uploadSlice = createSlice({
    name: 'uploadItemResc',
    initialState: {
        item: null,
        itemID: null,
        selectedFile: null,
        rescType: 'main',
        newRescFiles:[]
    },
    reducers: {

        setSelectedFile: (state, action) => {
            const {file} = action.payload
            return {
                ...state,
                selectedFile: file,
            }
        },

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

        setRescType: (state, action) => {
            return {
                ...state,
                rescType: action.payload,
            }
        },

        setNewRescFiles: (state, action) => {
            return {
                ...state,
                newRescFiles: action.payload,
            }
        },

    }
})

export const {setSelectedFile, setRescType, setItemID, setItem, setNewRescFiles} = uploadSlice.actions
export const selectUploadItemResc = state => state.uploadItemResc

export default uploadSlice.reducer