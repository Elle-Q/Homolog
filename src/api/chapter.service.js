import api from "./api";
export const GetChapters = (itemId) => {
    return api.get(`/leetroll-app/chapter/${itemId}`)
        .then(resp => {
            return resp
        })
}

