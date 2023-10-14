import api from "./api";



export const DeleteFile = (param) => {
    return api.post('/leetroll-admin/file/delete', param)
        .then(resp => {
            return resp
        })
}
