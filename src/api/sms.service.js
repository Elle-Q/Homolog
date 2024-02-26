import api from "./api";

export const SendSmsCode = (phone) => {
    return api.get(`/leetroll-app/sms/send/${phone}`)
        .then(resp => {
            return resp
        })
}
