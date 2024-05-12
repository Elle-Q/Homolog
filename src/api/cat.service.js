import api from "./api";

export const ListCats = () => {
    return api.get('/leetroll-admin/category/all')
}

export const UpdateCat = (param) => {
    return api.post('/leetroll-admin/cat/update', param)
}

export const ListCatName = () => {
    return api.get('/leetroll-admin/cat/list-name')
}

export const ListAllCat = () => {
    return api.get('/leetroll-app/category/all')
}

export const ListCatsWith4Items = () => {
    return api.get(`/leetroll-app/category/cats-with-4items`);
}

export const ListItems = (pageNumber, keyword, cat) => {
    return api.get(`/leetroll-app/search/${cat}/${pageNumber}/${keyword}`);
}

export const TotalSize = (keyword, cat) => {
    return api.get(`/leetroll-app/search/size/${cat}/${keyword}`);
}

export const ListMetrics = (catId) => {
    let params = {
        catId: catId
    }
    return api.get(`/leetroll-app/category/metrics`, {params: params});
}

export const AllMenu = () => {
    return api.get(`/leetroll-app/category/cat-menu`);
}