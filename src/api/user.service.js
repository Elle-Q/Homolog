import api from "./api";

class UserService {
    changeAvatar(avatarLink) {
        return api.post('/leetroll-app/user/avatar/update', {
            avatar: avatarLink
        })
            .then((resp) => {
                const user = JSON.parse(localStorage.getItem("user"));
                user.avatar = avatarLink
                localStorage.setItem("user", JSON.stringify(user))
                return resp;
            });
    }

    uploadAvatar(file) {
        const formData = new FormData();
        formData.append("file", file);
        return api.post('/leetroll-app/user/avatar/upload', formData)
            .then(resp=>resp)
    }

    changeBG(bgLink) {
        return api.post('/leetroll-app/user/bg/update', {
            bgImg: bgLink
        })
            .then((resp) => {
                const user = JSON.parse(localStorage.getItem("user"));
                user.bgImg = bgLink
                localStorage.setItem("user", JSON.stringify(user))
                return resp;
            });
    }

    getUser() {
        return api.get(`/leetroll-app/user/get`)
            .then((resp) => {
                localStorage.setItem("user", JSON.stringify(resp))
                return resp
            });
    }

    getLocalUser() {
        let localUser = localStorage.getItem("user")
        if (localUser && localUser !== 'undefined') {
            return JSON.parse(localUser)
        }
        return {}
    }

    update(user) {
        return api.post(`/leetroll-app/user/update`, user)
            .then((resp) => {
                localStorage.setItem("user", JSON.stringify(user))
                return resp
            });
    }

    removeUser() {
        localStorage.removeItem("user");
    }

}

export default new UserService();
