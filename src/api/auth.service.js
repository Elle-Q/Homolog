import TokenService from './token.service'
import {loginFail, loginSuccess, registerFail, registerSuccess} from "./authSlice";
import api from "./api";

class AuthService {
    login(username, password) {
        return api
            .post("/homo-app/user/login", {
                username,
                password
            })
            .then(resp => {
                if (resp) {
                    TokenService.setUser(resp);
                }
                return resp;
            },
            err => {
               return Promise.reject(err)
            })
    }

    logout() {
        TokenService.removeUser();
    }

    signup(username, phone, password) {
        return api.post('/homo-app/user/signup', {
            username,
            phone,
            password
        })
    }
}

const authService = new AuthService()

export const signup = (username, phone, password) => (dispatch) => {
    return authService.signup(username, phone, password).then(
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


export const login = (username, password) => (dispatch) => {
    return authService.login(username, password).then(
        resp => {
            dispatch(loginSuccess(resp));

            return Promise.resolve();
        },
        err => {
            dispatch(loginFail());
        }
    )
}

