
const api = require("./api");

export const getDefaultAvatar = () => {
    api.post('/homo-app/config/default-avatar', {
        name: 'default_avatar',
    })
        .then((resp) => {
            return resp;
        });
}