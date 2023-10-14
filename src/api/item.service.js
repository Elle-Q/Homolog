import api from "./api";
import {setItem} from "../views/app/play/playSlice";

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
export const GetItemWithFiles = (itemId) => dispatch => {
    return api.get(`/leetroll-app/item/files/${itemId}`)
        .then(resp => {
            dispatch(setItem(resp))
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