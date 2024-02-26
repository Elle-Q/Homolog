import api from "./api";
import {setChapters} from "../views/app/play/playSlice";

export const getCart = (userId) => {
    return api.get(`/leetroll-app/cart/get`)
        .then(resp => {
            return resp
        })
}

export const countCart = () => {
    return api.get(`/leetroll-app/cart/count`)
        .then(resp => {
            return resp
        })
}

export const addItem2Cart = (itemId) => {
    return api.get(`/leetroll-app/cart/add/${itemId}`)
        .then(resp => {
            return resp
        })
}

export const delItem = (itemId) => {
    return api.get(`/leetroll-app/cart/del/${itemId}`)
        .then(resp => {
            return resp
        })
}


