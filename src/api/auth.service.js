import TokenService from './token.service'
import {loginFail, loginSuccess, registerFail, registerSuccess} from "./authSlice";
import api from "./api";

class AuthService {
    login(phone, password) {
        let param = new FormData();
        param.append("phone", phone);
        param.append("password", password);
        return api.post("/leetroll-app/user/login", param)
            .then(resp => {
                //设置token
                TokenService.setTokens({
                    AccessToken: resp.accessToken,
                    RefreshToken: resp.refreshToken,
                });
                return resp;
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
