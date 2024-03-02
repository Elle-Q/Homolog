import api from "./api";

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

export const listOrder = (status) => {
    let params = {
        status: status
    }
    return api.get(`/leetroll-app/order/list`, {params: params})
        .then(resp => {
            return resp
        })
}

export const checkOrderStatus = (batchCode) => {
    let params = {
        batchCode: batchCode
    }
    return api.get(`/leetroll-app/order/checkStatus`, {params: params})
        .then(resp => {
            return resp
        })
}

