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

export const ListItems = (pageNumber, keyword, cat, metric) => {
    let params = {
        pageNumber: pageNumber,
        pageSize: 12,
        keyword: keyword,
        cat: cat,
        metric: metric,
    }
    return api.get(`/leetroll-app/search/query`, {params: params})
        .then((resp) => {
            return resp
        });
}

export const TotalSize = (keyword, cat, metric) => {
    let params = {
        keyword: keyword,
        cat: cat,
        metric: metric,
    }
    return api.get(`/leetroll-app/search/size`, {params: params})
        .then((resp) => {
            return resp
        });
}

export const ListMetrics = (cat) => {
    let params = {
        cat: cat
    }
    return api.get(`/leetroll-app/category/metrics`, {params: params})
        .then((resp) => {
            return resp
        });
}