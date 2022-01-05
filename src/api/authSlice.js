import {createSlice} from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem("user"))
export const authSlice = createSlice({
    name: 'auth',

    initialState: user
        ? {isLogin: true, user}
        : {isLogin: false, user: null},

    reducers: {
        registerSuccess: (state, action) => {
            const {user} = action.payload;
            return {
                ...state,
                isLogin: false,
            }
        },
        registerFail: (state, action) => {
            const {msg} = action.payload;
            return {
                ...state,
                isLogin: false,
            }
        },
        loginSuccess: (state, action) => {
            const {user} = action.payload;
            return {
                ...state,
                isLogin: true,
                user:user
            }
        },
        loginFail: (state, action) => {
            const {msg} = action.payload;
            return {
                ...state,
                isLogin: false,
                user: null
            }
        },
        logout: (state) => {
            return {
                ...state,
                isLogin: false,
                user: null
            }
        },
        refreshToken: (state, action) => {
            const {AccessToken} = action.payload;
            return {
                ...state,
                isLogin: false,
                user: {...user, AccessToken:AccessToken}
            }
        },

    }
})

export const {loginSuccess, loginFail, logout, refreshToken, registerSuccess, registerFail} = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice.reducer