import api from "./api";
import {loginFail, loginSuccess, registerSuccess, setAvatar, setBG, setUser} from "./authSlice";
import {authService} from "./auth.service";

class UserService {
    changeAvatar(userId, avatarLink) {
        return api.post('/leetroll-app/user/avatar/update', {
            id: userId,
            avatar: avatarLink
        })
            .then((resp) => {
                return resp;
            });
    }

    changeBG(userId, bgLink) {
        return api.post('/leetroll-app/user/bg/update', {
            id: userId,
            bgImg: bgLink
        })
            .then((resp) => {
                return resp;
            });
    }

    getUser() {
        return api.get(`/leetroll-app/user/get`)
            .then((resp) => {
                return resp
            });
    }

    update(user) {
        return api.post(`/leetroll-app/user/update`, user)
            .then((resp) => {
                return resp
            });
    }
}

export default new UserService();
