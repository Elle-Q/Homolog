import React from 'react';
import api from "./api";
import {loginFail, loginSuccess, registerFail, registerSuccess, setAvatar, setBG, setUser} from "./authSlice";
import {authService} from "./auth.service";

class UserService {
    changeAvatar(userId, avatarLink) {
        return api.post('/leetroll-app/user/avatar/update', {
            UserId: userId,
            Avatar: avatarLink
        })
            .then((resp) => {
               return resp;
            });
    }

    changeBG(userId, bgLink) {
        return api.post('/leetroll-app/user/bg/update', {
            UserId: userId,
            BgImag: bgLink
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

const userService = new UserService();

export const getUser = () => (dispatch) => {
    userService.getUser().then(
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


export const signup = (username, phone, password, code) => (dispatch) => {
    return authService.signup(username, phone, password, code).then(
        resp => {
            dispatch(registerSuccess())
            return Promise.resolve();
        },
        err => {
            dispatch(registerFail())
            return Promise.reject();
        }
    )
}

export const login = (phone, password) => (dispatch) => {
    return authService.login(phone, password).then(
    resp => {
            userService.getUser().then(
                resp => {
                    debugger
                    dispatch(loginSuccess(resp))
                    return resp
                }
            )
            return resp;
        },
        err => {
            dispatch(loginFail());
        }
    )
}
