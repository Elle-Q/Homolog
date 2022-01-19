import {createSlice} from '@reduxjs/toolkit'

const tokens = JSON.parse(localStorage.getItem("tokens"))
const userId = JSON.parse(localStorage.getItem("userId"))

const admin = {
    Id:1,
    Avatar: "http://pub.gomolog.com/1641478710497/avatar3.jpg"
}

export const authSlice = createSlice({
    name: 'auth',

    initialState: (tokens && userId)
        ? {isLogin: true,userId: userId,user:null}
        : {isLogin: false, userId: null,user:null},

    reducers: {
        registerSuccess: (state, action) => {
            const {userId} = action.payload;

            return {
                ...state,
                isLogin: false,
                userId: userId
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
                userId:user.ID,
                user:user
            }
        },
        loginFail: (state, action) => {
            const {msg} = action.payload;
            return {
                ...state,
                isLogin: false,
                userId: null
            }
        },
        logout: (state) => {
            return {
                ...state,
                isLogin: false,
                userId: null,
                user:null
            }
        },
        setUser: (state, action) => {
            return {
                ...state,
                user:action.payload
            }
        },
        setAvatar: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    Avatar:action.payload
                }
            }
        },
        setBG: (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    Avatar:action.payload
                }
            }
        },
    }
})

export const {loginSuccess, loginFail, logout, registerSuccess, registerFail, setUser, setAvatar, setBG} = authSlice.actions

export const selectAuth = state => state.auth

export default authSlice.reducer