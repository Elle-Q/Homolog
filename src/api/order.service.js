import api from "./api";

export const createOrder = (order) => {
    return api.post(`/leetroll-app/order/edit`, order)
        .then(resp => {
            return resp
        })
}

export const delOrder = (orderId) => {
    return api.get(`/leetroll-app/order/del/${orderId}`)
        .then(resp => {
            return resp
        })
}

export const countOrder = () => {
    return api.get(`/leetroll-app/order/count`)
        .then(resp => {
            return resp
        })
}

export const listOrder = () => {
    return api.get(`/leetroll-app/order/list`)
        .then(resp => {
            return resp
        })
}

