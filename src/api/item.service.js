import api from "./api";

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