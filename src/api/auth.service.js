import TokenService from './token.service'
import {loginFail, loginSuccess, registerFail, registerSuccess} from "./authSlice";
import api from "./api";

class AuthService {
    login(username, password) {
        return api
            .post("/leetroll-app/user/login", {
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
                    //设置User
                    TokenService.setUser(resp.User.ID);
                    return resp;
                }
            },
            err => {
               return Promise.reject(err)
            })
    }

    logout() {
        TokenService.removeAuth();
        window.location = "/app";
    }

    signup(username, phone, password, code) {
        return api.post('/leetroll-app/user/signup', {
            username,
            phone,
            password,
            code
        })
    }
}

export const authService = new AuthService()

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


export const login = (username, password) => (dispatch) => {
    return authService.login(username, password).then(
        resp => {
            dispatch(loginSuccess({user:resp.User}));
            return resp;
        },
        err => {
            dispatch(loginFail());
        }
    )
}

