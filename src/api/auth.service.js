import TokenService from './token.service'
import api from "./api";
import UserService from "./user.service";

class AuthService {
    login(phone, password) {
        let param = new FormData();
        param.append("phone", phone);
        param.append("password", password);
        return api.post("/leetroll-app/login", param)
            .then(resp => {
                if (resp != null) {
                    //设置token
                    TokenService.setTokens({
                        AccessToken: resp.accessToken,
                        RefreshToken: resp.refreshToken,
                    });
                }
                return resp;
            })
    }

    logout() {
        TokenService.removeAuth();
        UserService.removeUser()
        window.location = "/app";
    }

    signup(name, phone, password, code) {
        return api.post('/leetroll-app/register', {
            name,
            phone,
            password,
            code
        })
    }
}

export default new AuthService()
