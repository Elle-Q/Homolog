import api from "./api";


export const toggleAtion = (itemId, action) => {
    let params = {
        itemId: itemId,
        action: action
    }
    return api.get(`/leetroll-app/action/toggle`, {params: params})
        .then(resp => {
            return resp
        })
}


