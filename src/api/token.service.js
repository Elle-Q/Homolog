
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

    setTokens(tokens) {
        localStorage.setItem("tokens", JSON.stringify(tokens))
    }

    removeAuth() {
        localStorage.removeItem("tokens");
        localStorage.removeItem("userId")
    }

    setUser(userId) {
        localStorage.setItem("userId", JSON.stringify(userId))
    }
}

export default new TokenService();