
class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.RefreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.AccessToken;
    }

    updateLocalToken(tokens) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.AccessToken = tokens?.AccessToken;
        user.RefreshToken = tokens?.RefreshToken;
        localStorage.setItem("user", JSON.stringify(user))
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"))
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user))
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();