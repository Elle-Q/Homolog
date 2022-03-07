import api from "./api";

export const ListCat = () => {
    return api.get('/homo-admin/cat/list')
        .then(resp => {
            return resp
        })
}

export const UpdateCat = (param) => {
    return api.post('/homo-admin/cat/update', param)
        .then(resp => {
            return resp
        })
}

export const ListCatName = () => {
    return api.get('/homo-admin/cat/list-name')
        .then(resp => {
            return resp
        })
}

export const GetCat = (catId) => {
    return api.get(`/homo-app/category/${catId}`)
        .then((resp) => {
            return resp
        });
}

export const ListCatsWithItems = () => {
    return api.get(`/homo-app/category/list/items`)
        .then((resp) => {
            return resp
        });
}