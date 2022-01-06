
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
        tokens.AccessToken = token?.AccessToken;
        tokens.RefreshToken = token?.RefreshToken;
        localStorage.setItem("tokens", JSON.stringify(tokens))
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"))
    }

    setTokens(tokens) {
        localStorage.setItem("tokens", JSON.stringify(tokens))
    }

    removeTokens() {
        localStorage.removeItem("tokens");
    }
}

export default new TokenService();