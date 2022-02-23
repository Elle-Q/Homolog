import {createSlice} from '@reduxjs/toolkit'

export const uploadSlice = createSlice({
    name: 'uploadItemResc',
    initialState: {
        selectedFileName: {},
        selectedFileFormat: 'video',
    },
    reducers: {

        setSelectedFileName: (state, action) => {
            const {fileName} = action.payload
            return {
                ...state,
                selectedFileName: fileName,
            }
        },

        setSelectedFileFormat: (state, action) => {
            const {fileFormat} = action.payload
            return {
                ...state,
                selectedFileFormat: fileFormat,
            }
        }
    }
})

export const {setSelectedFileName, setSelectedFileFormat} = uploadSlice.actions
export const selectUploadItemResc = state => state.uploadItemResc

export default uploadSlice.reducer