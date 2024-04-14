import api from "./api";


export const AddComment = (param) => {
    return api.post('/leetroll-app/comment/add', param)
        .then(() => {})
}

export const ListComment = (rescType, rescId) => {
    let params = {
        rescType: rescType,
        rescId: rescId
    }
    return api.get('/leetroll-app/comment/list',{params: params})
}

export const CountComment = (rescType, rescId) => {
    let params = {
        rescType: rescType,
        rescId: rescId
    }
    return api.get('/leetroll-app/comment/count',{params: params})
}
