import axios from "axios";
import TokenService from './token.service'

class AuthService {
    login(username, password) {
        return axios
            .post("/auth/login", {
                username,
                password
            })
            .then(resp => {
                if (resp.data.AccessToken) {
                    TokenService.setUser(resp.data);
                }
                return resp;
            })
    }

    logout() {
        TokenService.removeUser();
    }

    signup(username, phone, password) {
        return axios.post('/auth/signup', {
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
            dispatch({
                type: "SET_MESSAGE",
                payload: resp.data.message,
            })

            return Promise.resolve();
        },
        err => {
            dispatch({
                type: "SET_MESSAGE",
                payload: "message",
            });

            return Promise.reject();
        }
    )
}


export const login = (username, password) => (dispatch) => {
    return authService.login(username, password).then(
        resp => {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { user: resp.data },
            });

            return Promise.resolve();
        },
        err => {
            dispatch({
                type: "LOGIN_FAIL",
            });

            dispatch({
                type: "SET_MESSAGE",
                payload:  err.message
            });
        }
    )
}

export const refreshToken = (accessToken) => (dispatch) => {
    dispatch({
        type: "REFRESH_TOKEN",
        payload: accessToken,
    })
}