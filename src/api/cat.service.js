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

export const ListItems = (pageNumber, keyword, catId, metric) => {
    let params = {
        pageNumber: pageNumber,
        pageSize: 12,
        keyword: keyword,
        catId: catId,
        metric: metric,
    }
    return api.get(`/leetroll-app/search/query`, {params: params})
        .then((resp) => {
            return resp
        });
}

export const TotalSize = (keyword, catId, metric) => {
    let params = {
        keyword: keyword,
        catId: catId,
        metric: metric,
    }
    return api.get(`/leetroll-app/search/size`, {params: params})
        .then((resp) => {
            return resp
        });
}

export const ListMetrics = (catId) => {
    let params = {
        catId: catId
    }
    return api.get(`/leetroll-app/category/metrics`, {params: params})
        .then((resp) => {
            return resp
        });
}