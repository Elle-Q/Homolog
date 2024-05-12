import api from "./api";

export const createOrder = (order, details) => {
    let param = {
        order: order,
        details: details
    }
    return api.post(`/leetroll-app/pay/wepay`, param)
        .then(resp => {
            return resp
        })
}

export const subscribe = (vip) => {
    return api.get(`/leetroll-app/pay/subscribe/${vip}`)
}
