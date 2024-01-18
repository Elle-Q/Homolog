import api from "./api";
import {setChapters} from "../views/app/play/playSlice";

export const SendSmsCode = (phone) => {
    return api.get(`/leetroll-app/sms/send/${phone}`)
        .then(resp => {
            return resp
        })
}
