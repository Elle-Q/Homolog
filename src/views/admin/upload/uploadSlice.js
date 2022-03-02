import {createSlice} from '@reduxjs/toolkit'

export const uploadSlice = createSlice({
    name: 'uploadItemResc',
    initialState: {
        selectedFile: null,
        selectedFileFormat: 'video',
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

        setSelectedFileFormat: (state, action) => {
            const {fileFormat} = action.payload
            return {
                ...state,
                selectedFileFormat: fileFormat,
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

export const {setSelectedFile, setSelectedFileFormat, setNewRescFiles} = uploadSlice.actions
export const selectUploadItemResc = state => state.uploadItemResc

export default uploadSlice.reducer