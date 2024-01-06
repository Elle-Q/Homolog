import api from "./api";

export const ListCats = () => {
    return api.get('/leetroll-admin/category/all')
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

export const ListAllCat = () => {
    return api.get('/leetroll-app/category/all')
        .then(resp => {
            return resp
        })
}

export const ListCatsWith4Items = () => {
    return api.get(`/leetroll-app/category/cats-with-4items`)
        .then((resp) => {
            return resp
        });
}

export const ListItems = (catId) => {
    return api.get(`/leetroll-app/search`)
        .then((resp) => {
            return resp
        });
}