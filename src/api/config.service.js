import api from "./api";

// const api = require("./api");

export const getDefaultAvatar = () => {
    let name = 'default_avatar'
    return api.get(`/homo-app/config/${name}`)
        .then((resp) => {
            return resp
        });
}