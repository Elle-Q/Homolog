
class TokenService {
    getLocalRefreshToken() {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        return tokens?.RefreshToken;
    }

    getLocalAccessToken() {
        const tokens = JSON.parse(localStorage.getItem("tokens"));
        return tokens?.AccessToken;
    }

    updateLocalToken(token) {
        let tokens = JSON.parse(localStorage.getItem("tokens"));
        tokens.AccessToken = token?.accessToken;
        tokens.RefreshToken = token?.refreshToken;
        localStorage.setItem("tokens", JSON.stringify(tokens))
    }

    setTokens(tokens) {
        localStorage.setItem("tokens", JSON.stringify(tokens))
    }

    removeAuth() {
        localStorage.removeItem("tokens");
    }

}

export default new TokenService();