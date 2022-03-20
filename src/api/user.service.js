import React from 'react';
import api from "./api";
import {setAvatar, setBG, setUser} from "./authSlice";

class UserService {
    changeAvatar(userId, avatarLink) {
        return api.post('/homo-app/user/avatar/update', {
            UserId: userId,
            Avatar: avatarLink
        })
            .then((resp) => {
               return resp;
            });
    }

    changeBG(userId, bgLink) {
        return api.post('/homo-app/user/bg/update', {
            UserId: userId,
            BgImag: bgLink
        })
            .then((resp) => {
                return resp;
            });
    }

    getUser(userId) {
       return api.get(`/homo-app/user/${userId}`)
            .then((resp) => {
                return resp
            });
    }

    update(user) {
        return api.post(`/homo-app/user/update`, user)
            .then((resp) => {
                return resp
            });
    }
}

const userService = new UserService();

export const getUser = () => (dispatch) => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    userService.getUser(userId).then(
        resp => {
            dispatch(setUser(resp))
            return resp
        }
    )
}

export const updateAvatar = (userId, link) => (dispatch) => {
    userService.changeAvatar(userId, link).then(
        resp => {
            dispatch(setAvatar(link))
            return resp
        }
    )
}

export const updateBG = (userId, link) => (dispatch) => {
    userService.changeBG(userId, link).then(
        resp => {
            dispatch(setBG(link))
            return resp
        }
    )
}

export const updateUser = (user) => (dispatch) => {
    userService.update(user).then(
        resp => {
            dispatch(setUser(user))
            return resp
        }
    )
}
