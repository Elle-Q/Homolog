import api from "./api";
import {setChapters} from "../views/app/play/playSlice";

export const GetItem = (itemId) => {
    return api.get(`/leetroll-app/item/get/${itemId}`)
        .then(resp => {
            return resp
        })
}

export const GetChapters = (itemId) => dispatch => {
    return api.get(`/leetroll-app/item/chapter/${itemId}`)
        .then(resp => {
            dispatch(setChapters(resp))
            return resp
        })
}

export const ListActionItems = (pageNumber, action) => {
    let params = {
        pageNumber: pageNumber,
        pageSize: 12,
        action: action,
    }
    return api.get(`/leetroll-app/item/listByAction`, {params: params})
        .then((resp) => {
            return resp
        });
}

export const TotalActionSize = (action) => {
    let params = {
        action: action,
    }
    return api.get(`/leetroll-app/item/countByAction`, {params: params})
        .then((resp) => {
            return resp
        });
}
