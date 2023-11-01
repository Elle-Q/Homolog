import api from "./api";
import {setChapter} from "../views/app/play/playSlice";

export const GetItem = (itemId) => {
    return api.get(`/leetroll-app/item/${itemId}`)
        .then(resp => {
            return resp
        })
}

export const GetItemFiles = (itemId) => {
    return api.get(`/leetroll-admin/item/files/${itemId}`)
        .then(resp => {
            return resp
        })
}

export const AppGetItemFiles = (itemId) => {
    return api.get(`/leetroll-app/item/files/${itemId}`)
        .then(resp => {
            return resp
        })
}
//todo： delete
/*export const GetItemWithFiles = (itemId) => dispatch => {
    return api.get(`/leetroll-app/item/files/${itemId}`)
        .then(resp => {
            dispatch(setItem(resp))
            return resp
        })
}*/

export const GetChapter = (chapterId) => dispatch => {
    return api.get(`/leetroll-app/item/chapter/${chapterId}`)
        .then(resp => {
            dispatch(setChapter(resp))
            return resp
        })
}

export const listItem = () => {
    return api.get('/leetroll-admin/item/list')
        .then(resp => {
            return resp
        })
}

export const UpdateItem = (param) => {
    return api.post('/leetroll-admin/item/update', param)
        .then(resp => {
            return resp
        })
}

export const UploadItemFiles = (param) => {
    return api.post('/leetroll-admin/item/upload', param)
        .then(resp => {
            return resp
        })
}

export const UploadItemChapters = (param) => {
    return api.post('/leetroll-admin/chapter/upload', param)
        .then(resp => {
            return resp
        })
}