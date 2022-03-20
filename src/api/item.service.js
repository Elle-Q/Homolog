import api from "./api";
import {setItem} from "../views/app/play/playSlice";

export const GetItem = (itemId) => {
    return api.get(`/homo-app/item/${itemId}`)
        .then(resp => {
            return resp
        })
}

export const GetItemFiles = (itemId) => {
    return api.get(`/homo-admin/item/files/${itemId}`)
        .then(resp => {
            return resp
        })
}
export const GetItemWithFiles = (itemId) => dispatch => {
    return api.get(`/homo-app/item/files/${itemId}`)
        .then(resp => {
            dispatch(setItem(resp))
            return resp
        })
}

export const listItem = () => {
    return api.get('/homo-admin/item/list')
        .then(resp => {
            return resp
        })
}

export const UpdateItem = (param) => {
    return api.post('/homo-admin/item/update', param)
        .then(resp => {
            return resp
        })
}

export const UploadItemFiles = (param) => {
    return api.post('/homo-admin/item/upload', param)
        .then(resp => {
            return resp
        })
}