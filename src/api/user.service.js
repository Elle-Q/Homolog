import React from 'react';
import api from "./api";

class UserService {
    changeAvatar(avatarFile) {
        const param = new FormData();
        avatarFile && param.append("Avatar", avatarFile);
        param.append("UserId", 1);
        api.post('/homo-app/user/avatar/update', param)
            .then((resp) => {
                console.log("热水瓶:", resp)
               return resp;
            });
    }

}

export default new UserService();