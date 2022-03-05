import api from "./api";



export const DeleteFile = (param) => {
    return api.post('/homo-admin/file/delete', param)
        .then(resp => {
            return resp
        })
}
