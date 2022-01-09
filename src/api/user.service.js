import React from 'react';
import api from "./api";

class UserService {
    changeAvatar(userId, avatarLink) {
        api.post('/homo-app/user/avatar/update', {
            UserId: userId,
            Avatar: avatarLink
        })
            .then((resp) => {
                console.log("头像修改成功:", resp)
               return resp;
            });
    }
}

export default new UserService();