import api from "./api";

export const GetItem = (itemId) => {
    return api.get(`/leetroll-app/item/get/${itemId}`)
        .then(resp => {
            return resp
        })
}
export const ListActionItems = (pageNumber, action) => {
    let params = {
        pageNumber: pageNumber,
        pageSize: 12,
        action: action,
    }
    return api.get(`/leetroll-app/item/listByAction`, {params: params})
        .then((resp) => {
            return resp
        });
}

export const TotalActionSize = (action) => {
    let params = {
        action: action,
    }
    return api.get(`/leetroll-app/item/countByAction`, {params: params})
        .then((resp) => {
            return resp
        });
}

export const downloadAttachment = (itemId, format) => {
    return api.get(`/leetroll-app/item/download-attach/${itemId}`)
        .then(resp => {
            return resp
        })
}
