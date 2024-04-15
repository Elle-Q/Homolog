import api from "./api";

export const listCart = () => {
    return api.get(`/leetroll-app/cart/list`)
        .then(resp => {
            return resp
        })
}

export const pageCart = (pageNumber) => {
    let params = {
        pageNumber: pageNumber,
        pageSize: 12,
    }
    return api.get(`/leetroll-app/cart/page`, {params: params})
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




