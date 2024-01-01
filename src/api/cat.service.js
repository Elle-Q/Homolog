import api from "./api";

export const ListCat = () => {
    return api.get('/leetroll-admin/cat/list')
        .then(resp => {
            return resp
        })
}

export const UpdateCat = (param) => {
    return api.post('/leetroll-admin/cat/update', param)
        .then(resp => {
            return resp
        })
}

export const ListCatName = () => {
    return api.get('/leetroll-admin/cat/list-name')
        .then(resp => {
            return resp
        })
}

export const GetCat = (catId) => {
    return api.get(`/leetroll-app/category/${catId}`)
        .then((resp) => {
            return resp
        });
}

export const ListCatsWith4Items = () => {
    return api.get(`/leetroll-app/category/list/items`)
        .then((resp) => {
            return resp
        });
}

export const ListCatItems = (catId) => {
    return api.get(`/leetroll-app/item/allitems/${catId}`)
        .then((resp) => {
            return resp
        });
}