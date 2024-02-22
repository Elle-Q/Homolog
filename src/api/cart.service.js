import api from "./api";
import {setChapters} from "../views/app/play/playSlice";

export const getCart = (userId) => {
    return api.get(`/leetroll-app/cart/get/${userId}`)
        .then(resp => {
            return resp
        })
}

export const addItem2Cart = (userId, itemId) => {
    let param= {
        userId: userId,
        itemId: itemId
    }
    return api.post(`/leetroll-app/cart/add`, param)
        .then(resp => {
            return resp
        })
}


