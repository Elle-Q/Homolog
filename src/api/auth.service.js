import TokenService from './token.service'
import UserService from './user.service'
import {loginFail, loginSuccess, registerFail, registerSuccess} from "./authSlice";
import api from "./api";

class AuthService {
    login(username, password) {
        return api
            .post("/homo-app/user/login", {
                UserName:username,
                Password: password
            })
            .then(resp => {
                if (resp) {
                    //设置token
                    TokenService.setTokens({
                        AccessToken: resp.AccessToken,
                        RefreshToken: resp.RefreshToken,
                    });
                    return resp;
                }
            },
            err => {
               return Promise.reject(err)
            })
    }

    logout() {
        TokenService.removeTokens();
        window.location = "/app";
    }

    signup(username, phone, password) {
        return api.post('/homo-app/user/signup', {
            username,
            phone,
            password
        })
    }
}

export const authService = new AuthService()

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
            dispatch(loginSuccess({user:resp.User}));

            return Promise.resolve();
        },
        err => {
            dispatch(loginFail());
        }
    )
}

