import api from "./api";

export const GetItem = (itemId) => {
    return api.get(`/leetroll-app/item/get/${itemId}`)
}
export const ListActionItems = (pageNumber, action) => {
    let params = {
        pageNumber: pageNumber,
        pageSize: 12,
        action: action,
    }
    return api.get(`/leetroll-app/item/listByAction`, {params: params})
}

export const TotalActionSize = (action) => {
    let params = {
        action: action,
    }
    return api.get(`/leetroll-app/item/countByAction`, {params: params})
}

export const downloadAttachment = (itemId, format) => {
    return api.get(`/leetroll-app/item/download-attach/${itemId}`)
}

export const updatePrice = (itemId, price) => {
    let params = {
        id: itemId,
        price: price,
    }
    return api.get(`/leetroll-app/item/update-price/`, {params: params})
}

export const updateTag = (itemId, tag) => {
    let params = {
        id: itemId,
        tag: tag,
    }
    return api.get(`/leetroll-app/item/update-tag/`, {params: params})
}