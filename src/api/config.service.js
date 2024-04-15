import api from "./api";

export const getDefaultAvatar = () => {
    let name = 'default_avatar'
    return api.get(`/leetroll-app/config/${name}`)
        .then((resp) => {
            return resp
        });
}

export const getDefaultBG = () => {
    let name = 'default_bg'
    return api.get(`/leetroll-app/config/${name}`)
        .then((resp) => {
            return resp
        });
}

export const getAgreement = (type) => {
    let params = {
        type: type
    }
    return api.get(`/leetroll-app/config/agreement`,{params: params})
        .then((resp) => {
            return resp
        });
}

export const getCarousel = () => {
    return api.get(`/leetroll-app/config/carousel`)
        .then((resp) => {
            return resp
        });
}

export const getCurrentEffect = () => {
    return api.get(`/leetroll-app/config/bg_effect`)
        .then((resp) => {
            return resp
        });
}
